import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IWrapperColumn>`
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

function WrapperColumn({ children, jc, p, w, h }: IWrapperColumn) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h}>
      {children}
    </Wrapper>
  );
}

WrapperColumn.defaultProps = {
  jc: 'flex-start',
  p: '0',
  w: '',
  h: '',
};

export default WrapperColumn;
