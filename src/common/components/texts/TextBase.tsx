import { theme } from 'assets/styles/theme';
import React from 'react';
import styled from 'styled-components';

export interface ITextProps {
  m?: string;
  p?: string;
  fontFamily?: 'Nanum Gothic' | 'Noto Sans KR';
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  lineHight?: number;
}

export const Text = styled.span<ITextProps>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize};
  line-height: ${(p) => p.lineHight};
`;

export interface ITextBase extends ITextProps {
  text?: string | null | number;
}

function TextBase({ text, p, m, fontFamily, fontWeight, color, fontSize, lineHight, ...rest }: ITextBase) {
  return (
    <Text
      m={m}
      p={p}
      color={color}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHight={lineHight}
      {...rest}
    >
      {text}
    </Text>
  );
}

TextBase.defaultProps = {
  text: '',
  p: '0',
  m: '0',
  color: theme.color.achromatic.black,
  fontFamily: 'Noto Sans KR',
  fontWeight: 400,
  fontSize: '1rem',
  lineHight: 1.2,
};

export default TextBase;
