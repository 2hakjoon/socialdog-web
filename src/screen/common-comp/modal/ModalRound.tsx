import React, { ReactNode } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';
import { theme } from 'assets/styles/theme';
import WrapperButton from '../wrappers/WrapperButton';

const Wrapper = styled.div`
  width: 90%;
  max-width: 600px;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  z-index: 6;
  position: relative;
  overflow: hidden;
  padding-top: 50px;
`;

const TopBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

interface IModalRound {
  children: ReactNode;
  title: string;
  closeModal: () => void;
}

function ModalRound({ children, title, closeModal }: IModalRound) {
  return (
    <Wrapper>
      <TopBarWrapper>
        <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
        <TextBase text={title} fontWeight={500} />
        <WrapperButton w="" h="" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="2x" data-cy="btn-close-modal"/>
        </WrapperButton>
      </TopBarWrapper>
      <ContentsWrapper>{children}</ContentsWrapper>
    </Wrapper>
  );
}

export default ModalRound;
