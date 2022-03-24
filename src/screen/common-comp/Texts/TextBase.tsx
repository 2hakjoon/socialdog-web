import { theme } from 'assets/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface IText {
  m?: string;
  p?: string;
  fontFamily: string;
  fontWeight?: number;
  fontSize?: string;
}

const Text = styled.span<IText>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize};
`;

interface ITextBase {
  text?: string | null | number;
  m?: string;
  p?: string;
  color?: string;
  fontFamily?: 'noto' | 'nanum';
  fontWeight?: number;
  fontSize?: string;
}

function TextBase({ text, p, m, fontFamily, fontWeight, color, fontSize }: ITextBase) {
  const setFontName = (font: string | undefined) => {
    switch (font) {
      case 'nanum':
        return 'Nanum Gothic';
      default:
        return 'Noto Sans KR';
    }
  };

  return (
    <Text m={m} p={p} color={color} fontFamily={setFontName(fontFamily)} fontWeight={fontWeight} fontSize={fontSize}>
      {text}
    </Text>
  );
}

TextBase.defaultProps = {
  text: '',
  p: '0',
  m: '0',
  color: theme.color.achromatic.black,
  fontFamily: 'noto',
  fontWeight: 400,
  fontSize: '1rem',
};

export default TextBase;
