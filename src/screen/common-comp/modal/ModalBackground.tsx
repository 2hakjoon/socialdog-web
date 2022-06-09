import React, { BaseSyntheticEvent, MouseEvent, ReactNode, useEffect } from 'react';
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
  z-index: 5;
`;

interface IModalBackground {
  children: ReactNode;
  closeModal: () => void;
}

function ModalBackground({ children, closeModal }: IModalBackground) {
  const bodyOverflowHidden = () => {
    document.body.style.overflow = 'hidden';
  };

  const onBackgroundClick = (e?: BaseSyntheticEvent) => {
    if (checkBackgroundClicked(e?.target.id)) {
      closeModal();
      closeModalAndOverflowScroll();
    }
  };

  const closeModalAndOverflowScroll = () => {
    document.body.style.overflow = 'scroll';
  };

  const checkBackgroundClicked = (id: string) => {
    return id === MODAL_BACKGROUND;
  };

  useEffect(() => {
    bodyOverflowHidden();
    return () => closeModalAndOverflowScroll();
  }, []);

  return (
    <Wrapper id={MODAL_BACKGROUND} onClick={(e) => onBackgroundClick(e)}>
      {children}
    </Wrapper>
  );
}

export default ModalBackground;
