import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import PostCard from '../../../src/screen/home/components/PostCard';
import { theme } from '../../../src/assets/styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const postData = {
  __typename: 'Posts',
  likes: 0,
  commentCounts: 0,
  id: '32cdda30-c042-4f58-9d6a-adaba1125e58',
  photos:
    '["https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/Sun%2C%2003%20Jul%202022%2008%3A30%3A02%20GMT_KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg"]',
  placeId: 'ChIJm7oRy-tVZDURS9uIugCbJJE',
  address: '대한민국',
  contents: '테스트',
  liked: false,
  createdAt: '1656837002465',
  updatedAt: '1656837002465',
  user: {
    __typename: 'UserProfile',
    id: 'c78618f9-ed0e-4b51-b4ae-a84037adc6c5',
    username: '사용자-14385008',
    photo: 'https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg',
    profileOpen: false,
  },
};

const linkUserPhoto = '[data-cy=link-user-photo]';
const linkUserName = '[data-cy=link-user-name]';
const textTimeAgo = '[data-cy=text-time-ago]';
const textUpdate = '[data-cy=text-updated]';
const btnDropdownReport = '[data-cy=btn-dropdown-report]';
const carouselPhoto = '[data-cy=carousel-photo]';
const carouselFirstPhoto = '[data-cy=carousel-photo-0]';
const buttonLike = '[data-cy=button-like]';
const iconLocationDot = '[data-cy=icon-location-dot]';
const textAddress = '[data-cy=text-address]';
const linkPostDetail = '[data-cy=link-post-detail]';
const textContent = '[data-cy=text-content]';
const textCountComment = '[data-cy=text-count-comment]';

const postCardComponentDefault = (
  <Router>
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<PostCard {...postData} />} />
        </Routes>
      </ThemeProvider>
    </MockedProvider>
  </Router>
);

const postCardComponentLiked = (
  <Router>
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<PostCard {...postData} />} />
        </Routes>
      </ThemeProvider>
    </MockedProvider>
  </Router>
);

describe('postCardComponentDefault', () => {
  it('should be rendered', () => {
    cy.mount(postCardComponentDefault);
  });

  it('should be render items', () => {
    cy.mount(postCardComponentDefault);


    cy.get(linkUserPhoto).should('exist');
    cy.get(linkUserName).should('exist');
    cy.get(textTimeAgo).should('exist');
    cy.get(btnDropdownReport).should('exist');
    cy.get(carouselFirstPhoto).should('exist');
    cy.get(buttonLike).should('exist');
    cy.get(iconLocationDot).should('exist');
    cy.get(textAddress).should('exist');
    cy.get(linkPostDetail).should('exist');
    cy.get(textContent).should('exist');
  });
});
