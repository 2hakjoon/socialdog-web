import React from 'react';

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
