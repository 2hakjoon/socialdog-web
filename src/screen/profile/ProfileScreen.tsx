import React from 'react';
import { loginState } from 'apollo-setup';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import { removeAllTokens } from 'utils/local-storage';
import MainHeader from 'screen/common-comp/header/MainHeader';

function ProfileScreen() {
  const navigate = useNavigate();

  const logout = () => {
    removeAllTokens();
    loginState(false);
    navigate(routes.home);
  };

  const moveToEditPost = () => {
    navigate(routes.postEdit);
  };

  return (
    <>
      <MainHeader />
      <div>프로필 스크린 </div>
      <button type="button" onClick={moveToEditPost}>
        포스트 작성
      </button>
      <button type="button" onClick={logout}>
        로그아웃
      </button>
    </>
  );
}

export default ProfileScreen;
