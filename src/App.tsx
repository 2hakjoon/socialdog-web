import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { routes } from 'screen/routes';
import ProfileScreen from 'screen/profile/ProfileScreen';
import HomeScreen from 'screen/home/HomeScreen';
import { useReactiveVar } from '@apollo/client';
import { loginState } from './apollo-setup';

const ProfileEditScreen = lazy(() => import('screen/profile/ProfileEditScreen'));
const SearchScreen = lazy(() => import('screen/search/SearchScreen'));
const PostWriteScreen = lazy(() => import('screen/post-write/PostWriteScreen'));
const PostDetailScreen = lazy(() => import('screen/post-detail/PostDetailScreen'));
const CommentDetailScreen = lazy(() => import('screen/comment-detail/CommentDetailScreen'));
const LoginScreen = lazy(() => import('screen/login/LoginScreen'));
const ScrollToTop = lazy(() => import('screen/common-comp/scroll/ScrollToTop'));
const GeolocationComp = lazy(() => import('screen/common-comp/geolocation/GeolocationComp'));

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API_KEY);
window.Kakao.isInitialized();

function App() {
  const isLoggedIn = useReactiveVar(loginState);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <GeolocationComp />
        <Routes>
          {isLoggedIn ? (
            <>
              <Suspense fallback={<>HomeScreen</>}>
                <Route path={routes.home} element={<HomeScreen />} />
              </Suspense>
              <Suspense fallback={<>PostDetailScreen</>}>
                <Route path={routes.postDetail} element={<PostDetailScreen />} />
              </Suspense>
              <Suspense fallback={<>PostWriteScreen</>}>
                <Route path={routes.postWrite} element={<PostWriteScreen />} />
              </Suspense>
              <Suspense fallback={<>ProfileScreen</>}>
                <Route path={routes.profile} element={<ProfileScreen />} />
              </Suspense>
              <Suspense fallback={<>ProfileEditScreen</>}>
                <Route path={routes.profileEdit} element={<ProfileEditScreen />} />
              </Suspense>
              <Suspense fallback={<>SearchScreen</>}>
                <Route path={routes.search} element={<SearchScreen />} />
              </Suspense>
              <Suspense fallback={<>CommentDetailScreen</>}>
                <Route path={routes.commentDetail} element={<CommentDetailScreen />} />
              </Suspense>
            </>
          ) : (
            <Suspense fallback={<>LoginScreen</>}>
              <Route path="*" element={<LoginScreen />} />
            </Suspense>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
