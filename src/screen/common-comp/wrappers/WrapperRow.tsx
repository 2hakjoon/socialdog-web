import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IWrapperRow>`
  display: flex;
  align-items: center;
  padding: ${(p) => p.p};
  justify-content: ${(p) => p.jc};
  width: ${(p) => p.w};
  height: ${(p) => p.h};
`;

interface IWrapperRow {
  children: React.ReactNode;
  jc?: 'space-between' | 'flex-start' | 'flex-end' | 'space-around';
  p?: string;
  w?: string;
  h?: string;
}

function WrapperRow({ children, jc, p, w, h }: IWrapperRow) {
  return (
    <Wrapper jc={jc} p={p} w={w} h={h}>
      {children}
    </Wrapper>
  );
}

WrapperRow.defaultProps = {
  jc: 'flex-start',
  p: '0',
  w: '',
  h: '',
};

export default WrapperRow;
