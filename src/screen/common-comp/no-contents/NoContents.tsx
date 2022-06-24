import React from 'react';
import { faFaceGrinBeamSweat } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WrapperColumn from '../wrappers/WrapperColumn';
import TextBase from '../texts/TextBase';
import styled from 'styled-components';

interface NoContentsProps {
  text?: string;
}

const NoticeText = styled.p`
  margin-top: 30px;
  white-space: pre-line;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  line-height: 1.5;
`;

function NoContents({ text }: NoContentsProps) {
  return (
    <WrapperColumn p="30px">
      <FontAwesomeIcon icon={faFaceGrinBeamSweat} size={'8x'} color={'gray'} />
      <NoticeText>{text}</NoticeText>
    </WrapperColumn>
  );
}

NoContents.defaultProps = {
  text: '게시물이 없습니다.',
};

export default NoContents;
