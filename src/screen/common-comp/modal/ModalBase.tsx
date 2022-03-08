import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vh;
  height: 100vh;
  background-color: rgba(100, 100, 100, 0.8);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
`;

interface IModalBase {
  children: ReactNode;
}

function ModalBase({ children }: IModalBase) {
  useEffect(() => {
    console.log('ASdf');
  }, []);
  return <Wrapper>{children}</Wrapper>;
}

export default ModalBase;
