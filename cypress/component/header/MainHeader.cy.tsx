import React from 'react';
import MainHeader from '../../../src/screen/common-comp/header/MainHeader';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MYPROFILE } from '../../../src/apllo-gqls/users';

const username = "usename";

const mocks = [
  {
    request: {
      query: MYPROFILE,
    },
    result: {
      data: {
        me: {
          data: {
            id: 'c78618f9-ed0e-4b51-b4ae-a84037adc6c5',
            photo:
              'https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg',
            profileOpen: false,
            username: username,
            __typename: 'UserProfile',
          },
        },
      },
    },
  },
];

describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    cy.url();
    cy.viewport(500, 750);
    cy.mount(
      <MockedProvider mocks={mocks}>
        <Router>
          <Routes>
            <Route path={'*'} element={<MainHeader />} />
          </Routes>
        </Router>
      </MockedProvider>,
    );
  });
});
