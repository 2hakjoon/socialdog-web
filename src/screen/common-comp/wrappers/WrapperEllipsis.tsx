import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.p<IWrapperEllipsis>`
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
`;

interface IWrapperEllipsis {
  line: number;
  lineHeight?: number;
  children: ReactNode;
  onClick?: () => void;
}

function WrapperEllipsis({ line, children, lineHeight, onClick }: IWrapperEllipsis) {
  return (
    <Wrapper line={line} lineHeight={lineHeight} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

WrapperEllipsis.defaultProps = {
  lineHeight: 1.2,
  onClick: () => {},
};

export default WrapperEllipsis;
