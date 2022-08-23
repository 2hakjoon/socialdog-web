import useEvictCache from 'common/hooks/useEvictCache';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'common/components/header/MainHeader';
import ProfilePhoto from 'common/components/image/ProfilePhoto';
import TextBase from 'common/components/texts/TextBase';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'common/components/wrappers/WrapperInfinityScroll';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { alretError } from 'utils/alret';
import {
  QGetReComments_getReComments_data,
} from '__generated__/QGetReComments';
import CommentCard from './components/CommentCard';
import CommentCardLoading from './components/CommentCardLoading';
import ReCommentInput from './components/ReCommentInput';
import TextParagraph from 'common/components/texts/TextParagraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import TextLink from 'common/components/texts/TextLink';
import useDeleteComment from './hooks/useDeleteComment';
import useGetComment from './hooks/useGetComment';
import useReCommentData from './hooks/useReCommentData';

const CommentWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.screenMaxWidth};
  margin: 0 auto;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
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

  const { comment } = useGetComment({ commentId });
  const postId = comment?.postId;
  const [deleteComment] = useDeleteComment();

  const [getReCommentsData, { loading: reCommentLoading }] = useReCommentData();

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
    console.log(res);
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

  const refrechComment = async () => {
    setIsLastPage(false);
    const res = await getReCommentsData({
      variables: {
        args: { parentCommentId: commentId },
        page: {
          take: pageItemCount,
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
    setReCommentsList([...reComments]);
  };

  const moveToUserProfile = (username: string) => {
    navigate(`${routes.home}${username}`);
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper p="0">
        {comment && (
          <CommentWrapper>
            <WrapperRow w="100%" p="8px 0px" ai="flex-start">
              <Link to={`${routes.home}${comment.user.username}`}>
                <ProfilePhoto url={comment.user.photo} size="48px" />
              </Link>
              <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
                <TextLink
                  href={`${routes.home}${comment.user.username}`}
                  fontWeight={700}
                  text={comment.user.username}
                  m={'4px 0px'}
                />
              </WrapperColumn>
              <WrapperButton m={'0 12px'}>
                <FontAwesomeIcon icon={faTrashCan} size="lg" onClick={() => deleteCommentHandler(comment.id)} />
              </WrapperButton>
            </WrapperRow>
            <TextParagraph>
              <TextBase fontSize="0.875rem" text={comment.content} />
            </TextParagraph>
          </CommentWrapper>
        )}
        <WrapperColumn w="100%" p="0px 16px" bc="white">
          <WrapperInfinityScroll fetchHandler={refetchReComments}>
            {Boolean(reCommentsList) && (
              <>
                {reCommentsList.map((recomment) => (
                  <CommentCard
                    reCommentCounts={0}
                    key={recomment.id}
                    {...recomment}
                    setReCommentList={setReCommentsList}
                  />
                ))}
              </>
            )}
            {reCommentLoading &&
              Array(pageItemCount)
                .fill('')
                .map((_) => <CommentCardLoading key={Math.random()} />)}
          </WrapperInfinityScroll>
        </WrapperColumn>
      </BaseWrapper>
      {postId && <ReCommentInput parentCommentId={commentId} postId={postId} refrechComment={refrechComment} />}
    </>
  );
}

export default CommentDetailScreen;
