import React, { EventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IWrapperColumn>`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => p.ai};
  padding: ${(p) => p.p};
  justify-content: ${(p) => p.jc};
  width: ${(p) => p.w};
  height: ${(p) => p.h};
`;

interface IWrapperColumn {
  children: React.ReactNode;
  jc?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
  p?: string;
  w?: string;
  h?: string;
  ai?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
  onClick?: (e: any) => void;
}

function WrapperColumn({ children, jc, p, w, h, ai, onClick }: IWrapperColumn) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h} ai={ai} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

WrapperColumn.defaultProps = {
  jc: 'flex-start',
  p: '0',
  w: '',
  h: '',
  ai: 'center',
  onClick: (e: any) => {},
};

export default WrapperColumn;
