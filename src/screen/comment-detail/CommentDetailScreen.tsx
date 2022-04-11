import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_COMMENT, GET_COMMENT, GET_RECOMMENTS } from 'apllo-gqls/comments';
import dayjs from 'dayjs';
import useEvictCache from 'hooks/useEvictCache';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import ProfilePhoto from 'screen/common-comp/image/ProfilePhoto';
import TextBase from 'screen/common-comp/texts/TextBase';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { alretError } from 'utils/alret';
import { MDeleteComment, MDeleteCommentVariables } from '__generated__/MDeleteComment';
import { QGetComment, QGetCommentVariables } from '__generated__/QGetComment';
import {
  QGetReComments,
  QGetReCommentsVariables,
  QGetReComments_getReComments_data,
} from '__generated__/QGetReComments';
import CommentCard from './components/CommentCard';
import CommentCardLoading from './components/CommentCardLoading';
import ReCommentInput from './components/ReCommentInput';
import TextParagraph from 'screen/common-comp/texts/TextParagraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const CommentWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
`;

function CommentDetailScreen() {
  const pageItemCount = 12;
  const evictCache = useEvictCache();
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
  const [deleteComment] = useMutation<MDeleteComment, MDeleteCommentVariables>(DELETE_COMMENT);

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

  const deleteCommentHandler = async (commentId: string) => {
    if (!comment) {
      return;
    }
    if (!window.confirm('댓글을 삭제할까요?')) {
      return;
    }
    const res = await deleteComment({ variables: { args: { id: commentId } } });
    if (!res.data?.deleteComment.ok) {
      alretError();
      return;
    }
    evictCache(commentId, comment.__typename);
    navigate(-1);
  };

  const refrechComment = () => {
    setIsLastPage(false);
    setReCommentsList([]);
    refetchReComments();
  };

  return (
    <>
      <MainHeader />
      {comment && (
        <CommentWrapper>
          <WrapperRow w="100%" p="8px 0px" ai="flex-start">
            <ProfilePhoto url={comment.user.photo} size="48px" />
            <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
              <TextBase fontWeight={700} text={comment.user.username} m={'4px 0px'} />
            </WrapperColumn>
            <FontAwesomeIcon icon={faTrashCan} size="lg" onClick={() => deleteCommentHandler(comment.id)} />
          </WrapperRow>
          <TextParagraph>
            <TextBase fontSize="0.875rem" text={comment.content} />
          </TextParagraph>
        </CommentWrapper>
      )}
      <BaseWrapper>
        <WrapperInfinityScroll fetchHandler={refetchReComments}>
          {Boolean(reCommentsList) && (
            <>
              {reCommentsList.map((recomment) => (
                <CommentCard reCommentCounts={0} key={recomment.id} {...recomment} />
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
