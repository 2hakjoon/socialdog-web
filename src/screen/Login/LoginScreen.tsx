import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { getAccessToken, removeAllTokens, setAccessToken, setRefreshToken } from 'utils/local-storage';
import dayjs from 'dayjs';
import { MKakaoLogin, MKakaoLoginVariables } from '../../__generated__/MKakaoLogin';
import { loginState } from 'apollo-setup';
import { KAKAO_LOGIN } from 'apllo-gqls/auth';
import ImageBase from 'screen/common-comp/image/ImageBase';
import KakaoImg from '../../assets/png/kakao_login_medium_wide.png';
import styled from 'styled-components';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import logoWhite from 'assets/svg/social-dog-white.svg';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';

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
  const navigate = useNavigate();
  const [kakaoLogin] = useMutation<MKakaoLogin, MKakaoLoginVariables>(KAKAO_LOGIN);

  useEffect(() => {
    if (getAccessToken()) {
      removeAllTokens();
      alert('로그인 후 2주가 지났습니다. 보안을 위해서 다시 로그인 해 주세요');
    }
  }, []);

  const kakaoAuthHandler = async (authObj: IkakaoLoginSuccess) => {
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
      if (kakaoLoginResult.isJoin) {
        window.alert('가입을 환영합니다. 프로필 작성을 진행해주세요.');
        navigate(routes.profileEdit);
      }
    } else {
      alert(kakaoLoginResult?.error);
    }
  };

  const kakaoLoginApi = async () => {
    try {
      window.Kakao.Auth.login({
        success: async (authObj: IkakaoLoginSuccess) => {
          kakaoAuthHandler(authObj);
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
      <WrapperRow p="32px" onClick={kakaoLoginApi}>
        <ImageBase url={KakaoImg} />
      </WrapperRow>
    </Wrapper>
  );
}

export default LoginScreen;
