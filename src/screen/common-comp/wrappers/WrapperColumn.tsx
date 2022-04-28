import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IWrapperColumn>`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => p.ai};
  padding: ${(p) => p.p};
  justify-content: ${(p) => p.jc};
  width: ${(p) => p.w};
  height: ${(p) => p.h};
  margin: ${(p) => p.m};
  background-color: ${(p) => p.bc};
`;

interface IWrapperColumn {
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

function WrapperColumn({ children, jc, p, w, h, ai, m, bc, onClick }: IWrapperColumn) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h} ai={ai} m={m} bc={bc} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

WrapperColumn.defaultProps = {
  jc: 'flex-start',
  p: '0',
  w: '',
  h: '',
  m: '',
  ai: 'center',
  bc: 'white',
  onClick: (e: any) => {},
};

export default WrapperColumn;
