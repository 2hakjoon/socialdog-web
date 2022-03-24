import React from 'react';
import { faFaceGrinBeamSweat } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WrapperColumn from '../wrappers/WrapperColumn';
import TextBase from '../texts/TextBase';

function NoContents() {
  return (
    <WrapperColumn p="30px">
      <FontAwesomeIcon icon={faFaceGrinBeamSweat} size={'8x'} color={'gray'} />
      <TextBase text={'게시물이 없습니다.'} m={'30px'} />
    </WrapperColumn>
  );
}

export default NoContents;
