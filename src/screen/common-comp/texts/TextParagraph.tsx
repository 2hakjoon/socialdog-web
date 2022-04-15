import { theme } from 'assets/styles/theme';
import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.p<ITextParagraph>`
  word-wrap: break-word;
  word-break: break-all;
  width: 100%;
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  font-size: ${(p) => p.fontSize};
  color: ${(p) => p.color};
  line-height: ${(p) => p.lineHeight}em;
`;

interface ITextParagraph {
  children: ReactNode;
  fontFamily?: 'Nanum-Gothic' | 'Noto-Sans-KR';
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  lineHeight?: number;
}

function TextParagraph({ children, fontFamily, fontWeight, fontSize, color, lineHeight }: ITextParagraph) {
  return (
    <Wrapper fontFamily={fontFamily} fontWeight={fontWeight} fontSize={fontSize} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper>
  );
}

TextParagraph.defaultProps = {
  fontFamily: 'Noto Sans KR',
  fontWeight: 400,
  fontSize: '1rem',
  color: theme.color.achromatic.black,
  lineHeight: 1.2,
};

export default TextParagraph;
