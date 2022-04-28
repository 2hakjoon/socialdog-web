import React, { ReactNode } from 'react';
import styled from 'styled-components';
import TextBase, { ITextBase } from './TextBase';

const EllipsisWrapper = styled.p<ITextEllipsisProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.line}; /* ellipsis line */
  -webkit-box-orient: vertical;
  /* webkit 엔진을 사용하지 않는 브라우저를 위한 속성. */
  /* height = line-height * line = 1.2em * 3 = 3.6em  */
  line-height: ${(p) => p.lineHeight};
  height: ${(p) => p.height}em;
  flex-shrink: 0;

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
  children: ReactNode;
}
interface ITextEllipsisProps extends ITextEllipsis {
  height: number;
}

function TextEllipsis({
  line,
  children,
  p = '0',
  m = '0',
  fontFamily = 'Noto Sans KR',
  fontWeight = 400,
  color,
  fontSize = '1rem',
  lineHeight = 1.2,
  onClick,
}: ITextEllipsis) {
  const remToNumber = () => {
    return Number(fontSize.split('rem')[0]);
  };

  return (
    <>
      <EllipsisWrapper
        p={p}
        m={m}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        color={color}
        fontSize={fontSize}
        line={line}
        lineHeight={lineHeight}
        onClick={onClick}
        height={remToNumber() * lineHeight * line}
      >
        {children}
      </EllipsisWrapper>
    </>
  );
}

TextEllipsis.defaultProps = {
  lineHeight: 1.2,
  onClick: () => {},
};

export default TextEllipsis;
