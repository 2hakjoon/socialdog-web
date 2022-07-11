import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { routes } from 'screen/routes';
import ProfileScreen from 'screen/profile/ProfileScreen';
import HomeScreen from 'screen/home/HomeScreen';
import { useReactiveVar } from '@apollo/client';
import { loginState } from './apollo-setup';
import ErrorBoundary from 'screen/common-comp/error-boundary/ErrorBoundary';

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
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <ScrollToTop />
            <GeolocationComp />
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path={routes.home} element={<HomeScreen />} />
                  <Route path={routes.postDetail} element={<PostDetailScreen />} />
                  <Route path={routes.postWrite} element={<PostWriteScreen />} />
                  <Route path={routes.profile} element={<ProfileScreen />} />
                  <Route path={routes.profileEdit} element={<ProfileEditScreen />} />
                  <Route path={routes.search} element={<SearchScreen />} />
                  <Route path={routes.commentDetail} element={<CommentDetailScreen />} />
                </>
              ) : (
                <>
                  <Route path="*" element={<LoginScreen />} />
                </>
              )}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
