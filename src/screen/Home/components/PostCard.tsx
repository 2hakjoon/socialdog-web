import { theme } from 'assets/styles/theme';
import React from 'react';
import TextBase from 'screen/common-comp/Texts/TextBase';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 612px;
  width: 100%;
  background-color: white;
`;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
`;

function PostCard() {
  return (
    <Wrapper>
      <TopBar>
        <TextBase text="사용자 이름" />
      </TopBar>
    </Wrapper>
  );
}

export default PostCard;
