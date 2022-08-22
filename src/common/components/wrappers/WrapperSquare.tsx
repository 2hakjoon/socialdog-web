import React, { ReactChild } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IWrapperSquare>`
  & {
    width: ${(p) => p.w};
    position: relative;
  }
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  > * {
    position: absolute;
  }
`;

interface IWrapperSquare {
  children: ReactChild;
  w?: string;
}

function WrapperSquare({ children, w }: IWrapperSquare) {
  return <Wrapper w={w}>{children}</Wrapper>;
}

WrapperSquare.defaultProps = {
  w: '100%',
};

export default WrapperSquare;
