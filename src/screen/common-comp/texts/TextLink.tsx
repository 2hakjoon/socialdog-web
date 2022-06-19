import { theme } from 'assets/styles/theme';
import React from 'react';
import styled from 'styled-components';
import { ITextProps } from './TextBase';

export const Text = styled.a<ITextProps>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize};
  line-height: ${(p) => p.lineHight};
  text-decoration: none;
`;

export interface ITextLink extends ITextProps {
  text?: string | null | number;
  href: string;
}

function TextLink({ text, p, m, fontFamily, fontWeight, color, fontSize, lineHight, href }: ITextLink) {
  return (
    <Text
      href={href}
      m={m}
      p={p}
      color={color}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHight={lineHight}
    >
      {text}
    </Text>
  );
}

TextLink.defaultProps = {
  text: '',
  p: '0',
  m: '0',
  color: theme.color.achromatic.black,
  fontFamily: 'Noto Sans KR',
  fontWeight: 400,
  fontSize: '1rem',
  lineHight: 1.2,
};

export default TextLink;
