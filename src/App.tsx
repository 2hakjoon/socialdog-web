import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from 'screen/home/HomeScreen';
import LoginScreen from 'screen/Login/LoginScreen';
import PostScreen from 'screen/Post/PostScreen';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API_KEY);
window.Kakao.isInitialized();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/post" element={<PostScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
