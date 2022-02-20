import { theme } from 'assets/styles/theme';
import React from 'react';
import ImageBase from 'screen/common-comp/Image/ImageBase';
import ImageRound from 'screen/common-comp/Image/ImageRound';
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PostCard() {
  return (
    <Wrapper>
      <TopBar>
        <ImageRound size="30px" url="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" />
        <TextBase text="사용자 이름" />
      </TopBar>
    </Wrapper>
  );
}

export default PostCard;
