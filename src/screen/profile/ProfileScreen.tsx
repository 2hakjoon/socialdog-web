import { loginState } from 'apollo-setup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import { removeAllTokens } from 'utils/local-storage';

function ProfileScreen() {
  const navigate = useNavigate();

  const logout = () => {
    removeAllTokens();
    loginState(false);
    navigate(routes.home);
  };

  return (
    <>
      <div>프로필 스크린 </div>
      <button type="button" onClick={logout}>
        로그아웃
      </button>
    </>
  );
}

export default ProfileScreen;
