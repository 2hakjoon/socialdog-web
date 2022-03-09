import React, { BaseSyntheticEvent, MouseEvent, ReactNode } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { MODAL_BACKGROUND } from 'utils/constants';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.8);
  position: absolute;
  top: ${() => window.scrollY}px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IModalBackground {
  children: ReactNode;
  closeModal: () => void;
}

function ModalBackground({ children, closeModal }: IModalBackground) {
  const bodyOverflowHidden = () => {
    document.body.style.overflow = 'hidden';
  };

  const closeModalAndOverflowScroll = (e?: BaseSyntheticEvent) => {
    if (e?.target.id !== MODAL_BACKGROUND) {
      return;
    }
    document.body.style.overflow = 'scroll';
    closeModal();
  };

  useEffect(() => {
    bodyOverflowHidden();
    return () => closeModalAndOverflowScroll();
  }, []);

  return (
    <Wrapper id={MODAL_BACKGROUND} onClick={(e) => closeModalAndOverflowScroll(e)}>
      {children}
    </Wrapper>
  );
}

export default ModalBackground;
