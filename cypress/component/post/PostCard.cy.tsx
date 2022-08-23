import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import PostCard from '../../../src/screen/home/components/PostCard';
import { theme } from '../../../src/assets/styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { aFewTimeAgo } from '../../../src/utils/timeformat/aFewTimeAgo';
import { hexToRgb } from '../../support/utils';
import { routes } from '../../../src/screen/routes';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '../../../src/__generated__/QGetSubscribingPosts';
import { TOGGLE_LIKE_POST } from '../../../src/apllo-gqls/posts';

const id = '32cdda30-c042-4f58-9d6a-adaba1125e58';
const photos =
  '["https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/Sun%2C%2003%20Jul%202022%2008%3A30%3A02%20GMT_KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg","https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/Sun%2C%2003%20Jul%202022%2008%3A30%3A02%20GMT_KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg"]';
const firstPhoto =
  'https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/Sun%2C%2003%20Jul%202022%2008%3A30%3A02%20GMT_KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg';

const username = '사용자-14385008';
const userPhoto =
  'https://socialdog.s3.ap-northeast-2.amazonaws.com/userPhoto/KakaoTalk_Photo_2022-04-06-13-48-09%20001.jpeg';
const address = '대한민국';
const createdAt = '1656837002465';
const contents = '테스트';
const commentCount = 1;

const postDataDefault: QGetSubscribingPosts_getSubscribingPosts_data = {
  __typename: 'Posts',
  likes: 0,
  commentCounts: 0,
  id,
  photos,
  placeId: 'ChIJm7oRy-tVZDURS9uIugCbJJE',
  address,
  contents,
  liked: false,
  createdAt,
  updatedAt: '1656837002465',
  user: {
    __typename: 'UserProfile',
    id: 'c78618f9-ed0e-4b51-b4ae-a84037adc6c5',
    username,
    photo: userPhoto,
  },
};

const mock = [
  {
    request: {
      query: TOGGLE_LIKE_POST,
      variables: { args: { postId: id } },
    },
    result: {
      data: {
        toggleLikePost: {
          ...postDataDefault,
          liked: true,
        },
        ok: true,
      },
    },
  },
];
const postCardComponentDefault = (
  <Router>
    <MockedProvider mocks={mock}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<PostCard {...postDataDefault} />} />
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
          <Route path="*" element={<PostCard {...postDataDefault} liked />} />
        </Routes>
      </ThemeProvider>
    </MockedProvider>
  </Router>
);

const postCardComponentCommented = (
  <Router>
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<PostCard {...postDataDefault} commentCounts={commentCount} />} />
        </Routes>
      </ThemeProvider>
    </MockedProvider>
  </Router>
);

const postCardComponentUpdated = (
  <Router>
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<PostCard {...postDataDefault} updatedAt={`${+createdAt + 1}`} />} />
        </Routes>
      </ThemeProvider>
    </MockedProvider>
  </Router>
);

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

  it('should has corret data', () => {
    cy.mount(postCardComponentDefault);

    cy.get(linkUserPhoto).should('have.attr', 'href', `/${username}`);
    cy.get(linkUserName).should('have.attr', 'href', `/${username}`);
    cy.get(textTimeAgo).should('have.text', aFewTimeAgo(createdAt));
    cy.get(carouselFirstPhoto).should('have.attr', 'src', firstPhoto);
    cy.get(buttonLike).should('have.css', 'color', hexToRgb(theme.color.achromatic.darkGray));
    cy.get(textAddress).should('have.text', address);
    cy.get(linkPostDetail).should('have.attr', 'href', `${routes.postDetailBase}${id}`);
    cy.get(textContent).should('have.text', contents);
  });
});

describe('postCardComponentLiked', () => {
  it('should be rendered', () => {
    cy.mount(postCardComponentLiked);
  });
  it('should be blue color', () => {
    cy.mount(postCardComponentLiked);

    cy.get(buttonLike).should('have.css', 'color', hexToRgb(theme.color.blue.primaryBlue));
  });
});


// Todo : make this pass, coupling issue
// describe('postCardComponentClickLike', () => {
//   it('should be rendered', () => {
//     cy.mount(postCardComponentDefault);
//   });
//   it('should be blue color', () => {
//     cy.mount(postCardComponentDefault);

//     cy.get(buttonLike).click();
//     cy.get(buttonLike).should('have.css', 'color', hexToRgb(theme.color.blue.primaryBlue));
//   });
// });

describe('postCardComponentCommented', () => {
  it('should be rendered', () => {
    cy.mount(postCardComponentCommented);
  });
  it('should render comment count', () => {
    cy.mount(postCardComponentCommented);

    cy.get(textCountComment).should('exist');
  });
  it('should render comment count correctly', () => {
    cy.mount(postCardComponentCommented);

    cy.get(textCountComment).should('have.text', `댓글 수 : ${commentCount}개`);
  });
});

describe('postCardComponentUpdated', () => {
  it('should be rendered', () => {
    cy.mount(postCardComponentUpdated);
  });
  it('should render comment count', () => {
    cy.mount(postCardComponentUpdated);

    cy.get(textUpdate).should('exist');
  });
  it('should render updated count correctly', () => {
    cy.mount(postCardComponentUpdated);

    cy.get(textUpdate).should('have.text', `(수정됨)`);
  });
});
