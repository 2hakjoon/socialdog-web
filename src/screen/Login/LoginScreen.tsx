import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { setAccessToken, setRefreshToken } from 'utils/local-storage';
import dayjs from 'dayjs';
import { MKakaoLogin, MKakaoLoginVariables } from '../../__generated__/MKakaoLogin';
import { loginState } from 'apollo-setup';
import { KAKAO_LOGIN } from 'apllo-gqls/auth';
import ImageBase from 'screen/common-comp/image/ImageBase';
import KakaoImg from '../../assets/png/kakao_login_medium_wide.png';
import styled from 'styled-components';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import logoWhite from 'assets/svg/social-dog-white.svg';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.color.blue.primaryBlue};
`;

interface IkakaoLoginSuccess {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
}

function LoginScreen() {
  const [kakaoLogin] = useMutation<MKakaoLogin, MKakaoLoginVariables>(KAKAO_LOGIN);

  const loginWithKakao = async () => {
    try {
      window.Kakao.Auth.login({
        success: async (authObj: IkakaoLoginSuccess) => {
          const res = await kakaoLogin({
            variables: {
              args: {
                accessToken: authObj.access_token,
                accessTokenExpiresAt: dayjs().add(authObj.expires_in, 's').toISOString(),
                refreshToken: authObj.refresh_token,
                refreshTokenExpiresAt: dayjs().add(authObj.refresh_token_expires_in, 's').toISOString(),
                scopes: authObj.token_type,
              },
            },
          });
          const kakaoLoginResult = res.data?.kakaoLogin;
          if (kakaoLoginResult?.ok && kakaoLoginResult.accessToken && kakaoLoginResult.refreshToken) {
            setAccessToken(kakaoLoginResult.accessToken);
            setRefreshToken(kakaoLoginResult.refreshToken);
            loginState(true);
          } else {
            alert(kakaoLoginResult?.error);
          }
        },
        fail: () => {
          alert('카카오 로그인에 실패하였습니다.');
        },
      });
    } catch (e) {
      window.alert('에러가 발생했습니다.');
    }
  };

  return (
    <Wrapper>
      <WrapperRow p={'30px'} jc="center">
        <ImageBase url={logoWhite} />
      </WrapperRow>
      <WrapperRow p="32px" onClick={loginWithKakao}>
        <ImageBase url={KakaoImg} />
      </WrapperRow>
    </Wrapper>
  );
}

export default LoginScreen;
