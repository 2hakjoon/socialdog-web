import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from 'screen/home/HomeScreen';
import LoginScreen from 'screen/login/LoginScreen';
import PostScreen from 'screen/post/PostScreen';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider } from '@apollo/client';
import dayjs from 'dayjs';
import { routes } from 'screen/routes';
import ProfileScreen from 'screen/profile/ProfileScreen';
import { getAccessToken } from 'utils/local-storage';

window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API_KEY);
window.Kakao.isInitialized();

const httpLink = new HttpLink({ uri: 'http://121.154.94.120/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

function App() {
  console.log(getAccessToken());
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path={routes.home} element={<HomeScreen />} />
            <Route path={routes.login} element={<LoginScreen />} />
            <Route path={routes.post} element={<PostScreen />} />
            <Route path={routes.profile} element={<ProfileScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
