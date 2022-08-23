import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button<IWrapperButton>`
  display: flex;
  flex-direction: ${(p) => p.fd};
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
  fd?: 'row' | 'column';
  onClick?: (e: any) => void;
}

function WrapperButton({ children, jc, p, w, h, ai, m, bc, fd, onClick, ...rest }: IWrapperButton) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h} ai={ai} m={m} bc={bc} fd={fd} onClick={onClick} {...rest}>
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
  fd: 'row',
  onClick: (e: any) => {},
};

export default WrapperButton;
