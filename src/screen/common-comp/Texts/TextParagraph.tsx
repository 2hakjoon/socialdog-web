import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.p<ITextParagraph>`
  word-wrap: break-word;
  word-break: break-all;
`;

interface ITextParagraph {
  children: ReactNode;
}

function TextParagraph({ children }: ITextParagraph) {
  return <Wrapper>{children}</Wrapper>;
}

export default TextParagraph;
