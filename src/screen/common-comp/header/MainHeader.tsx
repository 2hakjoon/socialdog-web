import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'screen/routes';
import styled from 'styled-components';
import { getAccessToken } from 'utils/local-storage';
import socialDogLogoBlack from '../../../assets/svg/social-dog-black.svg';
import IconBook from 'assets/svg/IconBook';
import WrapperRow from '../wrappers/WrapperRow';
import IconClipBoard from 'assets/svg/IconClipBoard';
import IconUserSearch from 'assets/svg/IconUserSearch';
import { useQuery } from '@apollo/client';
import { MYPROFILE } from 'apllo-gqls/users';
import { QMe } from '__generated__/QMe';

const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 0 8px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`;

const Block = styled.div`
  width: 100%;
  height: 60px;
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
  const { data: userData } = useQuery<QMe>(MYPROFILE);
  const user = userData?.me.data;
  return (
    <>
      <Block />
      <Wrapper>
        <InnerWrapper>
          <Link to={routes.home}>
            <LogoWrapper>
              <img alt="asdf" src={socialDogLogoBlack} />
            </LogoWrapper>
          </Link>
          <WrapperRow w="100px" jc={'space-between'}>
            <Link to={routes.search}>
              <IconUserSearch size={24} />
            </Link>
            <Link to={routes.postWrite}>
              <IconClipBoard size={24} />
            </Link>
            {getAccessToken() ? (
              <Link to={user?.username ? `/${user?.username}` : routes.home}>
                <IconBook size={30} />
              </Link>
            ) : (
              <Link to={routes.login}>
                <div>로그인</div>
              </Link>
            )}
          </WrapperRow>
        </InnerWrapper>
      </Wrapper>
    </>
  );
}

export default MainHeader;
