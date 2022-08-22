import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { getAccessToken, removeAllTokens, setAccessToken, setRefreshToken } from 'utils/local-storage';
import dayjs from 'dayjs';
import { MKakaoLogin, MKakaoLoginVariables } from '../../__generated__/MKakaoLogin';
import { loginState } from 'apollo-setup';
import { KAKAO_LOGIN } from 'apllo-gqls/auth';
import ImageBase from 'common/components/image/ImageBase';
import KakaoImg from '../../assets/png/kakao_login_medium_wide.png';
import SplashImg from '../../assets/png/splash.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import ModalBackground from 'common/components/modal/ModalBackground';
import LoadingSpinner from 'assets/svg/LoadingSpinner';
import TermTemplate from './template/TermTemplate';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import { theme } from 'assets/styles/theme';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.color.blue.primaryBlue};
`;

const InnerWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const KakaoLoginWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  margin: 0 auto;
  padding: 32px;
  width: 100%;
  max-width: 500px;
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
  const [modalOpen, setModalOpen] = useState<'LOADING' | 'TERM' | null>(null);
  const [acceptTermState, setAccecptTermState] = useState(false);
  const [kakaoAuthLogin] = useMutation<MKakaoLogin, MKakaoLoginVariables>(KAKAO_LOGIN);

  useEffect(() => {
    if (getAccessToken()) {
      removeAllTokens();
      alert('보안을 위해서 다시 로그인 해 주세요');
    }
  }, []);

  const closeModal = () => {
    setModalOpen(null);
  };

  const closeModalBeforeCheck = () => {
    const confirm = window.confirm('창을 떠나시겠습니까?');
    if (confirm) setModalOpen(null);
  };

  const kakaoAuthHandler = async ({ authObj, acceptTerms }: { authObj: IkakaoLoginSuccess; acceptTerms: boolean }) => {
    setModalOpen('LOADING');
    const res = await kakaoAuthLogin({
      variables: {
        args: {
          accessToken: authObj.access_token,
          accessTokenExpiresAt: dayjs().add(authObj.expires_in, 's').toISOString(),
          refreshToken: authObj.refresh_token,
          refreshTokenExpiresAt: dayjs().add(authObj.refresh_token_expires_in, 's').toISOString(),
          scopes: authObj.token_type,
          acceptTerms: acceptTerms,
        },
      },
    });
    const kakaoLoginResult = res.data?.kakaoLogin;
    if (kakaoLoginResult?.ok) {
      if (kakaoLoginResult.acceptTerms === false) {
        window.alert('서비스 이용을 위해 약관에 동의 해 주세요.');
        setModalOpen('TERM');
      } else if (kakaoLoginResult.accessToken && kakaoLoginResult.refreshToken) {
        setAccessToken(kakaoLoginResult.accessToken);
        setRefreshToken(kakaoLoginResult.refreshToken);
        loginState(true);
        setModalOpen(null);
      }
    } else {
      alert(kakaoLoginResult?.error);
      setModalOpen(null);
    }
  };

  const kakaoLogin = async ({ accecptTerms = false }) => {
    // console.log('acceptTermState : ', accecptTerms);
    try {
      window.Kakao.Auth.login({
        success: async (authObj: IkakaoLoginSuccess) => {
          setModalOpen(null);
          kakaoAuthHandler({ authObj, acceptTerms: accecptTerms });
        },
        fail: () => {
          alert('카카오 로그인에 실패하였습니다.');
        },
      });
    } catch (e) {
      window.alert('에러가 발생했습니다.');
    }
  };

  const loginWithAcceptTerm = () => {
    kakaoLogin({ accecptTerms: true });
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <img data-cy="img-splash" alt='소셜독 아이콘' src={SplashImg} />
        <KakaoLoginWrapper data-cy="btn-kakaologin" onClick={() => kakaoLogin({ accecptTerms: false })}>
          <WrapperButton bc={theme.color.blue.primaryBlue} w={'100%'}>
            <ImageBase url={KakaoImg} />
          </WrapperButton>
        </KakaoLoginWrapper>
      </InnerWrapper>
      {modalOpen === 'LOADING' && (
        <ModalBackground closeModal={closeModal}>
          <LoadingSpinner />
        </ModalBackground>
      )}
      {modalOpen === 'TERM' && <TermTemplate nextStep={loginWithAcceptTerm} closeModal={closeModalBeforeCheck} />}
    </Wrapper>
  );
}

export default LoginScreen;
