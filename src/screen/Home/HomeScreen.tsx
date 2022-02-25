import { gql, useQuery } from '@apollo/client';
import React from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import PostCard from './components/PostCard';
import { QGetSubscribingPosts } from '../../../__generated__/QGetSubscribingPosts';
import { alretError } from 'utils/alret';

const SectionWrapper = styled.div`
  @media (max-width: 999px) {
    > :nth-child(1) {
      width: 100%;
    }
    > :nth-child(2) {
      display: none;
    }
  }
  @media (min-width: 1000px) {
    > :nth-child(1) {
      width: 70%;
    }
    > :nth-child(2) {
      width: 30%;
    }
  }
`;

const GET_SUBSCRIBING_POSTS = gql`
  query QGetSubscribingPosts {
    getSubscribingPosts {
      ok
      error
      data {
        id
        photos
        placeId
        address
        contents
        user {
          photo
          username
          id
        }
      }
    }
  }
`;

function HomeScreen() {
  const { data: postsData, loading: postsLoading } = useQuery<QGetSubscribingPosts>(GET_SUBSCRIBING_POSTS, {
    onError: (e) => console.log(e),
  });
  console.log(postsData, postsLoading);
  return (
    <>
      {postsLoading ? (
        <span>Loading</span>
      ) : (
        <>
          <MainHeader />
          <BaseWrapper>
            <SectionWrapper>
              <PostCard />
            </SectionWrapper>
          </BaseWrapper>
        </>
      )}
    </>
  );
}

export default HomeScreen;
