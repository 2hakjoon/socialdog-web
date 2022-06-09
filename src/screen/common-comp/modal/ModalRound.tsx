import React, { ReactNode } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';
import { theme } from 'assets/styles/theme';

const Wrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  background-color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  z-index: 6;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  padding: 10px 16px 6px 10px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
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
        <WrapperRow w="" h="" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </WrapperRow>
      </TopBarWrapper>
      {children}
    </Wrapper>
  );
}

export default ModalRound;
