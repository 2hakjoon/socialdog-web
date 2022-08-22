import React, { useEffect, useState, useRef } from 'react';
import WrapperRow from '../wrappers/WrapperRow';
import TextBase, { ITextBase } from './TextBase';
import TextEllipsis from './TextEllipsis';
import TextParagraph from './TextParagraph';

interface ITextEllipsis extends ITextBase {
  line: number;
  lineHeight?: number;
  onClick?: () => void;
}

function TextExpandEllipsis({
  line,
  text,
  p = '0',
  m = '0',
  fontFamily = 'Noto Sans KR',
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
          <TextEllipsis
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
            <span
              ref={ref}
              style={{ fontWeight, fontFamily: `${fontFamily}, sans-serif`, fontSize, color, lineHeight }}
            >
              {text}
            </span>
          </TextEllipsis>
          {showExpand && (
            <WrapperRow onClick={commentExpandHandler}>
              <TextBase fontSize="0.875rem" text={'자세히 보기'} p={'8px 0 0 0'}/>
            </WrapperRow>
          )}
        </>
      ) : (
        <>
          <TextParagraph
            lineHeight={lineHeight}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            color={color}
            fontSize={fontSize}
          >
            <span ref={ref}>{text}</span>
          </TextParagraph>
          <WrapperRow onClick={commentcontractHandler}>
            <TextBase fontSize="0.875rem" text={'간략히 보기'} p={'8px 0 0 0'}/>
          </WrapperRow>
        </>
      )}
    </>
  );
}

TextExpandEllipsis.defaultProps = {
  lineHeight: 1.2,
  onClick: () => {},
};

export default TextExpandEllipsis;
