import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from 'screen/home/HomeScreen';
import LoginScreen from 'screen/Login/LoginScreen';
import PostScreen from 'screen/Post/PostScreen';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider } from '@apollo/client';

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
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/post" element={<PostScreen />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
