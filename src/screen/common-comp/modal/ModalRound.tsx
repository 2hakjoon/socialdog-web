import React, { ReactNode } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';

const Wrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  height: 80vh;
  background-color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
`;

interface IModalRound {
  children: ReactNode;
  title: string;
  closeModal: () => void;
}

function ModalRound({ children, title, closeModal }: IModalRound) {
  return (
    <Wrapper>
      <WrapperRow w={'100%'} jc={'space-between'} p={'10px 16px 6px 10px'}>
        <FontAwesomeIcon icon={faXmark} size="2x" color="white" />
        <TextBase text={title} />
        <WrapperRow w="" h="" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </WrapperRow>
      </WrapperRow>
      {children}
    </Wrapper>
  );
}

export default ModalRound;
