import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { setAccessToken, setRefreshToken } from 'utils/local-storage';
import dayjs from 'dayjs';
import { MKakaoLogin, MKakaoLoginVariables } from '../../__generated__/MKakaoLogin';
import { loginState } from 'apollo-setup';
import { KAKAO_LOGIN } from 'apllo-gqls/auth';

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
    <>
      <div>Login </div>
      <button type="button" onClick={loginWithKakao}>
        카카오 로그인
      </button>
    </>
  );
}

export default LoginScreen;
