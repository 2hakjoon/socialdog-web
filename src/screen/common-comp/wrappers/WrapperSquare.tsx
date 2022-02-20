import React, { ReactChild } from 'react';
import styled from 'styled-components';

const ImgWrapper = styled.div`
  & {
    width: 100%;
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
}

function WrapperSquare({ children }: IWrapperSquare) {
  return <ImgWrapper>{children}</ImgWrapper>;
}

export default WrapperSquare;
