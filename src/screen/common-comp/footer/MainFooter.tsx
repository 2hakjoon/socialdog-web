import React from 'react';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';
import TextLink from '../texts/TextLink';

const Wrapper = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.achromatic.lightGray};
`;

const InnerWrapper = styled.nav`
  display: flex;
`;

function MainFooter() {
  return (
    <Wrapper>
      <InnerWrapper>
        <TextBase text={'서비스 이용약관'} />
        <TextBase text={'|'} p={'0px 10px'} />
        <TextBase text={'개인정보 처리방침'} />
      </InnerWrapper>
    </Wrapper>
  );
}

export default MainFooter;
