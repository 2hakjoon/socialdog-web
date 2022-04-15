import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import SkeletonCircle from 'screen/common-comp/skeleton/SkeletonCircle';
import SkeletonBox from 'screen/common-comp/skeleton/SkeletonBox';

const Wrapper = styled.article`
  margin: 16px 0;
  max-width: 612px;
  width: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 58px;
  border-bottom: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 0 16px 16px 0;
`;

const OnClickWrapper = styled.button`
  border: none;
  background-color: white;
`;

function PostCardLoading() {
  return (
    <Wrapper>
      <TopBar>
        <SkeletonCircle size="30px" />
        <SkeletonBox width="100px" height="30px" margin="0 8px" />
      </TopBar>
      <WrapperSquare>
        <SkeletonBox />
      </WrapperSquare>
      <Contents>
        <WrapperRow jc="space-between" w="100%" p="8px 0">
          <WrapperRow>
            <OnClickWrapper>
              <SkeletonCircle size="32px" />
            </OnClickWrapper>
            <SkeletonCircle size="32px" />
            <SkeletonBox width="100px" height="30px" margin="0 8px" />
          </WrapperRow>
        </WrapperRow>
        <SkeletonBox width="300px" height="30px" margin="4px 8px" />
        <SkeletonBox width="200px" height="30px" margin="4px 8px" />
      </Contents>
    </Wrapper>
  );
}

export default PostCardLoading;
