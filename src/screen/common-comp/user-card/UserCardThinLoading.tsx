import React from 'react';
import styled from 'styled-components';
import SkeletonBox from '../skeleton/SkeletonBox';
import SkeletonCircle from '../skeleton/SkeletonCircle';
import WrapperColumn from '../wrappers/WrapperColumn';

const Wrapper = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: flex-start;
  width: 100%;
`;

function UserCardThinLoading() {
  return (
    <Wrapper>
      <SkeletonCircle size="48px" />
      <WrapperColumn m={'0 16px'} jc="space-around" ai="flex-start">
        <SkeletonBox width="100px" height="20px" />
        <SkeletonBox width="50px" height="20px" />
      </WrapperColumn>
    </Wrapper>
  );
}

export default UserCardThinLoading;
