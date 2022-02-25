import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { getAccessToken, setAccessToken, setRefreshToken } from 'utils/local-storage';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { MKakaoLogin, MKakaoLoginVariables } from '../../../__generated__/MKakaoLogin';
import { routes } from 'screen/routes';
import { useEffect } from 'react';

const KAKAO_LOGIN = gql`
  mutation MKakaoLogin($args: KakaoLoginInputDto!) {
    kakaoLogin(args: $args) {
      ok
      error
      accessToken
      refreshToken
    }
  }
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
  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken()) {
      navigate(routes.home);
    }
  }, []);

  const loginWithKakao = async () => {
    window.Kakao.Auth.login({
      success: async (authObj: IkakaoLoginSuccess) => {
        console.log(authObj);
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
          navigate(routes.home);
        } else {
          alert(kakaoLoginResult?.error);
        }
      },
      fail: (err: any) => {
        alert('카카오 로그인에 실패하였습니다.');
      },
    });
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
