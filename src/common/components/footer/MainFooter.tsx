import { theme } from 'assets/styles/theme';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import ModalBackground from '../modal/ModalBackground';
import ModalRound from '../modal/ModalRound';
import TextBase from '../texts/TextBase';
import WrapperButton from '../wrappers/WrapperButton';

const Wrapper = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.achromatic.lightGray};
`;

const InnerWrapper = styled.nav`
  display: flex;
`;

const TermBox = styled.div`
  padding: 10px;
  font-family: 'Noto Sans KR', sans-serif;
`;

function MainFooter() {
  const [modalOpen, setModalOpen] = useState<'Service' | 'Privacy' | null>(null);
  const [termData, setTermData] = useState<string>('');

  const getTermsOfService = async () => {
    const res = await axios.get('https://socialdog.s3.ap-northeast-2.amazonaws.com/Terms/termsofservice.txt');
    setTermData(res.data);
  };

  const getTermsOfPrivacy = async () => {
    const res = await axios.get('https://socialdog.s3.ap-northeast-2.amazonaws.com/Terms/termsofprivacy.txt');
    setTermData(res.data);
  };

  const openTermsOfService = () => {
    getTermsOfService();
    setModalOpen('Service');
  };

  const openTermsOfPrivacy = () => {
    getTermsOfPrivacy();
    setModalOpen('Service');
  };

  const closeModal = () => {
    setModalOpen(null);
    setTermData('');
  };

  return (
    <>
      <Wrapper>
        <InnerWrapper>
          <WrapperButton onClick={openTermsOfService} bc={theme.color.achromatic.lightGray}>
            <TextBase fontSize='0.75rem' text={'서비스 이용약관'} color={theme.color.achromatic.darkGray} />
          </WrapperButton>
          <TextBase fontSize='0.75rem'  text={'|'} p={'0px 10px'} color={theme.color.achromatic.darkGray} />
          <WrapperButton onClick={openTermsOfPrivacy} bc={theme.color.achromatic.lightGray}>
            <TextBase fontSize='0.75rem' text={'개인정보 처리방침'} color={theme.color.achromatic.darkGray} />
          </WrapperButton>
        </InnerWrapper>
      </Wrapper>
      {modalOpen !== null && (
        <ModalBackground closeModal={closeModal}>
          <ModalRound closeModal={closeModal} title={modalOpen === 'Service' ? '개인정보 처리방침' : '서비스 이용약관'}>
            <TermBox dangerouslySetInnerHTML={{ __html: termData }} />
          </ModalRound>
        </ModalBackground>
      )}
    </>
  );
}

export default MainFooter;
