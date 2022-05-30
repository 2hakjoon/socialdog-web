import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { routes } from 'screen/routes';
import ProfileScreen from 'screen/profile/ProfileScreen';
import HomeScreen from 'screen/home/HomeScreen';
import { useReactiveVar } from '@apollo/client';
import { loginState } from './apollo-setup';
import ProfileEditScreen from 'screen/profile/ProfileEditScreen';
import SearchScreen from 'screen/search/SearchScreen';
import PostWriteScreen from 'screen/post-write/PostWriteScreen';
import PostDetailScreen from 'screen/post-detail/PostDetailScreen';
import CommentDetailScreen from 'screen/comment-detail/CommentDetailScreen';
import LoginScreen from 'screen/login/LoginScreen';
import ScrollToTop from 'screen/common-comp/scroll/ScrollToTop';
import GeolocationComp from 'screen/common-comp/geolocation/GeolocationComp';

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API_KEY);
window.Kakao.isInitialized();

function App() {
  const isLoggedIn = useReactiveVar(loginState);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GeolocationComp />
        <ScrollToTop />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
