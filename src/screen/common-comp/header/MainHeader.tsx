import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'screen/routes';
import styled from 'styled-components';
import { getAccessToken } from 'utils/local-storage';
import socialDogLogoBlack from '../../../assets/svg/social-dog-black.svg';

const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 0 8px;
`;

const InnerWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.screenMaxWidth};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

const LogoWrapper = styled.div`
  width: 130px;
  height: 50px;
  overflow: hidden;
`;

function MainHeader() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Link to={routes.home}>
          <LogoWrapper>
            <img alt="asdf" src={socialDogLogoBlack} />
          </LogoWrapper>
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
