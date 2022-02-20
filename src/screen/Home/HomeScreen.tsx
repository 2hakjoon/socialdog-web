import React from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import PostCard from './components/PostCard';

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

function HomeScreen() {
  return (
    <>
      <MainHeader />
      <BaseWrapper>
        <SectionWrapper>
          <PostCard />
        </SectionWrapper>
      </BaseWrapper>
    </>
  );
}

export default HomeScreen;
