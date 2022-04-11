import { theme } from 'assets/styles/theme';
import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { ITextBase } from './TextBase';

const Wrapper = styled.p<ITextEllipsis>`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.line}; /* ellipsis line */
  -webkit-box-orient: vertical;
  /* webkit 엔진을 사용하지 않는 브라우저를 위한 속성. */
  /* height = line-height * line = 1.2em * 3 = 3.6em  */
  line-height: ${(p) => p.lineHeight}em;
  height: ${(p) => p.lineHeight! * p.line + 0.2}em;

  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  color: ${(p) => p.color};
  font-size: ${(p) => p.fontSize};
`;

interface ITextEllipsis extends ITextBase {
  line: number;
  lineHeight?: number;
  onClick?: () => void;
  ref?: any;
}

function TextEllipsis({
  ref,
  line,
  text,
  p,
  m,
  fontFamily,
  fontWeight,
  color,
  fontSize,
  lineHeight,
  onClick,
}: ITextEllipsis) {
  return (
    <Wrapper
      text={text}
      p={p}
      m={m}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      color={color}
      fontSize={fontSize}
      ref={ref}
      line={line}
      lineHeight={lineHeight}
      onClick={onClick}
    >
      {text}
    </Wrapper>
  );
}

TextEllipsis.defaultProps = {
  lineHeight: 1.2,
  onClick: () => {},
  ref: () => {},
};

export default TextEllipsis;