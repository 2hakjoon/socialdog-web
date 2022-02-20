import React from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import PostCard from './components/PostCard';

const PostsWrapper = styled.div`
  width: 612px;
  height: 100%;
`;

function HomeScreen() {
  return (
    <>
      <MainHeader />
      <BaseWrapper>
        <PostsWrapper>
          <PostCard />
        </PostsWrapper>
      </BaseWrapper>
    </>
  );
}

export default HomeScreen;
