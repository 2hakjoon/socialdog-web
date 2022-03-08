import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vh;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.8);
  opacity: 0.5;
  position: absolute;
  top: ${() => window.scrollY}px;
  left: 0;
`;

interface IModalBase {
  children: ReactNode;
  closeModal: () => void;
}

function ModalBase({ children, closeModal }: IModalBase) {
  const bodyOverflowHidden = () => {
    document.body.style.overflow = 'hidden';
  };

  const closeModalAndOverflowScroll = () => {
    document.body.style.overflow = 'scroll';
    closeModal();
  };

  useEffect(() => {
    bodyOverflowHidden();
    console.log(window.scrollY);
    return () => closeModalAndOverflowScroll();
  }, []);
  return <Wrapper onClick={closeModalAndOverflowScroll}>{children}</Wrapper>;
}

export default ModalBase;
