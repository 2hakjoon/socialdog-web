import { theme } from 'assets/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface ITextProps {
  m?: string;
  p?: string;
  fontFamily?: 'Nanum-Gothic' | 'Noto-Sans-KR';
  fontWeight?: number;
  fontSize?: string;
  color?: string;
}

export const Text = styled.span<ITextProps>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize};
`;

export interface ITextBase extends ITextProps {
  text: string | null | number;
}

function TextBase({ text, p, m, fontFamily, fontWeight, color, fontSize }: ITextBase) {
  return (
    <Text m={m} p={p} color={color} fontFamily={fontFamily} fontWeight={fontWeight} fontSize={fontSize}>
      {text}
    </Text>
  );
}

TextBase.defaultProps = {
  p: '0',
  m: '0',
  color: theme.color.achromatic.black,
  fontFamily: 'Noto Sans KR',
  fontWeight: 400,
  fontSize: '1rem',
};

export default TextBase;
