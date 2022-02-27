import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { routes } from 'screen/routes';
import ProfileScreen from 'screen/profile/ProfileScreen';
import HomeScreen from 'screen/home/HomeScreen';
import PostEditScreen from 'screen/post-edit/PostEditScreen';
import LoginScreen from 'screen/login/LoginScreen';
import { useReactiveVar } from '@apollo/client';
import { loginState } from './apollo-setup';

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API_KEY);
window.Kakao.isInitialized();

function App() {
  const isLoggedIn = useReactiveVar(loginState);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path={routes.home} element={<HomeScreen />} />
              <Route path={routes.postEdit} element={<PostEditScreen />} />
              <Route path={routes.profile} element={<ProfileScreen />} />
            </>
          ) : (
            <Route path={routes.home} element={<PostEditScreen />} />

            // <Route path={routes.home} element={<LoginScreen />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
