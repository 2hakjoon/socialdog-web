import { far } from '@fortawesome/free-regular-svg-icons';
import { faR, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconCheckBox from 'assets/svg/IconCheckBox';
import IconSquare from 'assets/svg/IconSquare';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ButtonSubmit from 'screen/common-comp/button/ButtonSubmit';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';

const TermBox = styled.div`
  margin: 10px 0px 20px 0;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.color.achromatic.darkGray};
  height: 100%;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.875rem;
  overflow: scroll;
  border-radius: 8px;
`;

interface ITermTemplate {
  closeModal: () => void;
  nextStep: () => void;
}

function TermTemplate({ closeModal, nextStep }: ITermTemplate) {
  const [termsOfPrivacy, setTermsOfPrivacy] = useState('');
  const [termsOfService, setTermsOfService] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptService, setAcceptService] = useState(false);

  const getTermsOfPrivacy = async () => {
    const res = await axios.get('https://socialdog.s3.ap-northeast-2.amazonaws.com/Terms/termsofprivacy.txt');
    // console.log(res);
    setTermsOfPrivacy(res.data);
  };
  const getTermsOfService = async () => {
    const res = await axios.get('https://socialdog.s3.ap-northeast-2.amazonaws.com/Terms/termsofservice.txt');
    // console.log(res);
    setTermsOfService(res.data);
  };

  const toggleAccectPrivacy = () => {
    setAcceptPrivacy((prev) => !prev);
  };
  const toggleAccectService = () => {
    setAcceptService((prev) => !prev);
  };

  useEffect(() => {
    getTermsOfPrivacy();
    getTermsOfService();
  }, []);

  return (
    <ModalBackground closeModal={closeModal}>
      <ModalRound title="약관" closeModal={closeModal}>
        <WrapperColumn ai="flex-start" p="10px 14px" h="100%" w="100%" jc="space-between">
          <WrapperRow w={'100%'} jc="space-between" ai="flex-end">
            <TextBase text={'개인정보 처리 방침'} fontSize={'1.3rem'} />
            <WrapperRow onClick={toggleAccectPrivacy}>
              <TextBase text={'내용을 모두 확인하였으며, 이에 동의합니다.'} fontSize={'0.625rem'} />
              {acceptPrivacy ? <IconCheckBox size={18} /> : <IconSquare size={18} />}
            </WrapperRow>
          </WrapperRow>
          <TermBox dangerouslySetInnerHTML={{ __html: termsOfPrivacy }} />

          <WrapperRow w={'100%'} jc="space-between" ai="flex-end">
            <TextBase text={'서비스 이용 약관'} fontSize={'1.3rem'} />
            <WrapperRow onClick={toggleAccectService}>
              <TextBase text={'내용을 모두 확인하였으며, 이에 동의합니다.'} fontSize={'0.625rem'} />
              {acceptService ? <IconCheckBox size={18} /> : <IconSquare size={18} />}
            </WrapperRow>
          </WrapperRow>
          <TermBox dangerouslySetInnerHTML={{ __html: termsOfService }} />

          <ButtonSubmit enable={acceptPrivacy && acceptService} title="동의 완료" onClick={nextStep} />
        </WrapperColumn>
      </ModalRound>
    </ModalBackground>
  );
}

export default TermTemplate;
