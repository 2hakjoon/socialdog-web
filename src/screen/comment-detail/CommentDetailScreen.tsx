import { useQuery } from '@apollo/client';
import { GET_COMMENT, GET_RECOMMENTS } from 'apllo-gqls/comments';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';
import { routes } from 'screen/routes';
import { QGetComment, QGetCommentVariables } from '__generated__/QGetComment';
import { QGetReComments, QGetReCommentsVariables } from '__generated__/QGetReComments';
import CommentCard from './components/CommentCard';

function CommentDetailScreen() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState<number>(pageItemCount);
  const navigate = useNavigate();
  const { commentId } = useParams();
  if (!commentId) {
    navigate(routes.home);
    return <></>;
  }

  const { data: commentData } = useQuery<QGetComment, QGetCommentVariables>(GET_COMMENT, {
    variables: { args: { id: commentId } },
  });
  const comment = commentData?.getComment.data;

  const reCommentsData = useQuery<QGetReComments, QGetReCommentsVariables>(GET_RECOMMENTS, {
    variables: { args: { parentCommentId: commentId }, page: { take: 6 } },
  });
  const recomments = reCommentsData.data?.getReComments.data;
  console.log(comment);
  return (
    <>
      <MainHeader />
      {comment && <CommentCard {...comment} />}
      <BaseWrapper>
        <WrapperInfinityQueryScroll
          query={reCommentsData}
          pageItemCount={pageItemCount}
          itemLimit={itemLimit}
          setItemLimit={setItemLimit}
        >
          {Boolean(recomments) && (
            <>
              {recomments?.map((recomment) => (
                <CommentCard {...recomment} />
              ))}
            </>
          )}
        </WrapperInfinityQueryScroll>
      </BaseWrapper>
    </>
  );
}

export default CommentDetailScreen;
