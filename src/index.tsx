/* eslint-disable func-names */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo-setup';

if (process.env.NODE_ENV === 'production') {
  if (!window.console) {
    const console = {
      log: function () {},
      warn: function () {},
      error: function () {},
      time: function () {},
      timeEnd: function () {},
    };
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
