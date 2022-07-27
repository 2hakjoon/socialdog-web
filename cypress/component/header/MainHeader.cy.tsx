import React from 'react';
import MainHeader from '../../../src/screen/common-comp/header/MainHeader';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MYPROFILE } from '../../../src/apllo-gqls/users';
import { routes } from '../../../src/screen/routes';

const username = 'usename';

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

const mainLogo = '[data-cy=link-home]';
const iconSearch = '[data-cy=link-search]';
const iconPlus = '[data-cy=link-plus]';
const iconUser = '[data-cy=link-user]';

const MainHeaderComponent = (
  <MockedProvider mocks={mocks}>
    <Router>
      <Routes>
        <Route path={'*'} element={<MainHeader />} />
      </Routes>
    </Router>
  </MockedProvider>
);

describe('MainHeader.cy.ts', () => {
  it('should be rendered', () => {
    cy.mount(MainHeaderComponent);
  });

  it('should render icons', () => {
    cy.mount(MainHeaderComponent);

    cy.get(mainLogo).should('exist');
    cy.get(iconSearch).should('exist');
    cy.get(iconPlus).should('exist');
    cy.get(iconUser).should('exist');
  });

  it('should has link', () => {
    cy.mount(MainHeaderComponent);

    cy.get(mainLogo).should('have.attr', 'href', routes.home);
    cy.get(iconSearch).should('have.attr', 'href', routes.search);
    cy.get(iconPlus).should('have.attr', 'href', routes.postWrite);
    cy.get(iconUser).should('have.attr', 'href', `/${username}`);
  });
});
