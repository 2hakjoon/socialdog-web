import React from 'react';
import { useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';

function CommentDetailScreen() {
  const { commentId } = useParams();
  console.log(commentId);
  return (
    <>
      <MainHeader />
      <BaseWrapper>asdf</BaseWrapper>
    </>
  );
}

export default CommentDetailScreen;
