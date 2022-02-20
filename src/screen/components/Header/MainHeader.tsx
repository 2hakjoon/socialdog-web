import { theme } from 'assets/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
  height: 58px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
`;

const InnerWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

function MainHeader() {
  return (
    <Wrapper>
      <InnerWrapper>
        <div>홈으로</div>
        <div>프로필</div>
      </InnerWrapper>
    </Wrapper>
  );
}

export default MainHeader;
