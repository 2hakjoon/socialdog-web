import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'screen/routes';
import styled from 'styled-components';
import { getAccessToken } from 'utils/local-storage';
import socialDogLogoBlue from '../../../assets/svg/social-dog-blue.svg';
import socialDogLogoBlack from '../../../assets/svg/social-dog-black.svg';

const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
`;

const InnerWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.screenMaxWidth};
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
        <img alt="asdf" src={socialDogLogoBlue} />
        <img alt="asdf" src={socialDogLogoBlack} />
        <Link to={routes.home}>
          <div>홈으로</div>
        </Link>
        {getAccessToken() ? (
          <Link to={routes.profile}>
            <div>프로필</div>
          </Link>
        ) : (
          <Link to={routes.login}>
            <div>로그인</div>
          </Link>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}

export default MainHeader;
