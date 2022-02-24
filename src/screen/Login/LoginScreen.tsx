import { gql } from '@apollo/client';
import React from 'react';

const KAKAO_LOGIN = gql`
  mutation MKakaoLogin($args: KakaoLoginInputDto!) {
    kakaoLogin(args: $args) {
      ok
      error
    }
  }
`;

function LoginScreen() {
  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: (authObj: any) => {
        alert(JSON.stringify(authObj));
      },
      fail: (err: any) => {
        alert(JSON.stringify(err));
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
