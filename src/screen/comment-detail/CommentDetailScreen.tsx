import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COMMENT, GET_RECOMMENTS } from 'apllo-gqls/comments';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { routes } from 'screen/routes';
import { QGetComment, QGetCommentVariables } from '__generated__/QGetComment';
import {
  QGetReComments,
  QGetReCommentsVariables,
  QGetReComments_getReComments_data,
} from '__generated__/QGetReComments';
import CommentCard from './components/CommentCard';
import CommentCardLoading from './components/CommentCardLoading';
import ReCommentInput from './components/ReCommentInput';

function CommentDetailScreen() {
  const pageItemCount = 12;
  const [reCommentsList, setReCommentsList] = useState<QGetReComments_getReComments_data[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
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
  const postId = comment?.postId;

  const [getReCommentsData, { loading: reCommentLoading }] = useLazyQuery<QGetReComments, QGetReCommentsVariables>(
    GET_RECOMMENTS,
  );

  const refetchReComments = async () => {
    if (isLastPage) {
      return;
    }
    const res = await getReCommentsData({
      variables: {
        args: { parentCommentId: commentId },
        page: {
          take: pageItemCount,
          cursor: {
            id: reCommentsList[reCommentsList.length - 1]?.id || null,
            createdAt: reCommentsList[reCommentsList.length - 1]?.createdAt || null,
          },
        },
      },
    });
    if (!res.data?.getReComments.ok) {
      window.alert(res.data?.getReComments.error);
      return;
    }
    const reComments = res.data.getReComments.data;
    if (reComments.length < pageItemCount) {
      setIsLastPage(true);
    }
    setReCommentsList([...reCommentsList, ...reComments]);
  };

  const refrechComment = () => {
    setIsLastPage(false);
    setReCommentsList([]);
  };

  return (
    <>
      <MainHeader />
      {comment && <CommentCard {...comment} />}
      <BaseWrapper>
        <WrapperInfinityScroll fetchHandler={refetchReComments}>
          {Boolean(reCommentsList) && (
            <>
              {reCommentsList.map((recomment) => (
                <CommentCard key={recomment.id} {...recomment} />
              ))}
            </>
          )}
          {reCommentLoading &&
            Array(pageItemCount)
              .fill('')
              .map((_) => <CommentCardLoading key={Math.random()} />)}
        </WrapperInfinityScroll>
      </BaseWrapper>
      {postId && <ReCommentInput parentCommentId={commentId} postId={postId} refrechComment={refrechComment} />}
    </>
  );
}

export default CommentDetailScreen;
