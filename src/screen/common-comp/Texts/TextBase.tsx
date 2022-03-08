import React from 'react';
import styled from 'styled-components';

interface IText {
  m?: string;
  p?: string;
  fontFamily: string;
  fontWeight?: number;
}

const Text = styled.span<IText>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
`;

interface ITextBase {
  text?: string | null | number;
  m?: string;
  p?: string;
  fontFamily?: 'noto' | 'nanum';
  fontWeight?: number;
}

function TextBase({ text, p, m, fontFamily, fontWeight }: ITextBase) {
  const setFontName = (font: string | undefined) => {
    switch (font) {
      case 'nanum':
        return 'Nanum Gothic';
      default:
        return 'Noto Sans KR';
    }
  };

  return (
    <Text m={m} p={p} fontFamily={setFontName(fontFamily)} fontWeight={fontWeight}>
      {text}
    </Text>
  );
}

TextBase.defaultProps = {
  text: '',
  p: '0',
  m: '0',
  fontFamily: 'noto',
  fontWeight: 400,
};

export default TextBase;
