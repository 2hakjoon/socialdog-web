import { theme } from 'assets/styles/theme';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import WrapperRow from '../wrappers/WrapperRow';
import TextBase, { ITextBase } from './TextBase';
import TextParagraph from './TextParagraph';

const EllipsisWrapper = styled.p<ITextEllipsis>`
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

interface IParagraphWrapper {
  fontFamily?: 'Nanum-Gothic' | 'Noto-Sans-KR';
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  lineHeight?: number;
}

const ParagraphWrapper = styled.p<IParagraphWrapper>`
  word-wrap: break-word;
  word-break: break-all;
  font-family: ${(p) => p.fontFamily}, sans-serif;
  font-weight: ${(p) => p.fontWeight};
  font-size: ${(p) => p.fontSize};
  color: ${(p) => p.color};
  line-height: ${(p) => p.lineHeight}em;
`;

interface ITextEllipsis extends ITextBase {
  line: number;
  lineHeight?: number;
  onClick?: () => void;
}

function TextEllipsis({
  line,
  text,
  p = '0',
  m = '0',
  fontFamily = 'Noto-Sans-KR',
  fontWeight = 400,
  color,
  fontSize = '1rem',
  lineHeight = 1.2,
  onClick,
}: ITextEllipsis) {
  const ref = useRef<HTMLInputElement>(null);
  const [showExpand, setShowExpand] = useState<boolean>(false);
  const [commentExpand, setCommentExpand] = useState<boolean>(false);

  const commentExpandHandler = () => {
    setCommentExpand(true);
  };

  const commentcontractHandler = () => {
    setCommentExpand(false);
  };

  useEffect(() => {
    if (!ref?.current?.offsetHeight) {
      return;
    }
    if (ref?.current?.offsetHeight > (line + 1) * 16) {
      setShowExpand(true);
    }
  }, []);

  return (
    <>
      {!commentExpand ? (
        <>
          <EllipsisWrapper
            text={text}
            p={p}
            m={m}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            color={color}
            fontSize={fontSize}
            line={line}
            lineHeight={lineHeight}
            onClick={onClick}
          >
            <span ref={ref}>{text}</span>
          </EllipsisWrapper>
          {showExpand && (
            <WrapperRow onClick={commentExpandHandler}>
              <TextBase fontSize="0.875rem" text={'자세히 보기'} />
            </WrapperRow>
          )}
        </>
      ) : (
        <>
          <ParagraphWrapper
            lineHeight={lineHeight}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            color={color}
            fontSize={fontSize}
          >
            <span ref={ref}>{text}</span>
          </ParagraphWrapper>
          <WrapperRow onClick={commentcontractHandler}>
            <TextBase fontSize="0.875rem" text={'간략히 보기'} />
          </WrapperRow>
        </>
      )}
    </>
  );
}

TextEllipsis.defaultProps = {
  lineHeight: 1.2,
  onClick: () => {},
};

export default TextEllipsis;
