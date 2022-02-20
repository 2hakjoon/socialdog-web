import { theme } from 'assets/styles/theme';
import React from 'react';
import ImageBase from 'screen/common-comp/Image/ImageBase';
import ImageRound from 'screen/common-comp/Image/ImageRound';
import TextBase from 'screen/common-comp/Texts/TextBase';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 612px;
  width: 100%;
  background-color: white;
`;

const TopBar = styled.div`
  width: calc(100% - 2px);
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
      <WrapperSquare>
        <ImageBase url="http://blog.jinbo.net/attach/615/200937431.jpg" />
      </WrapperSquare>
    </Wrapper>
  );
}

export default PostCard;
