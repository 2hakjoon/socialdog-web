import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button<IWrapperButton>`
  display: flex;
  flex-direction: row;
  align-items: ${(p) => p.ai};
  padding: ${(p) => p.p};
  justify-content: ${(p) => p.jc};
  width: ${(p) => p.w};
  height: ${(p) => p.h};
  margin: ${(p) => p.m};
  background-color: ${(p) => p.bc};
  border: 0px;
  cursor: pointer;
`;

interface IWrapperButton {
  children: React.ReactNode;
  jc?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center';
  p?: string;
  m?: string;
  w?: string;
  bc?: string;
  h?: string;
  ai?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
  onClick?: (e: any) => void;
}

function WrapperButton({ children, jc, p, w, h, ai, m, bc, onClick }: IWrapperButton) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h} ai={ai} m={m} bc={bc} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

WrapperButton.defaultProps = {
  jc: 'center',
  p: '0',
  w: '',
  h: '',
  m: '0',
  ai: 'center',
  bc: 'white',
  onClick: (e: any) => {},
};

export default WrapperButton;
