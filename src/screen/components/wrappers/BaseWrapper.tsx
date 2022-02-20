import { theme } from 'assets/styles/theme';
import React, { ReactChild } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

interface IBaseWrapper {
  children: ReactChild;
}

function BaseWrapper({ children }: IBaseWrapper) {
  return <Wrapper>{children}</Wrapper>;
}

export default BaseWrapper;
