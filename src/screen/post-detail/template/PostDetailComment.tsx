import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import dayjs from 'dayjs';
import { useMeQuery } from 'hooks/useMeQuery';
import React, { useEffect, useState } from 'react';
import CommentCardLoading from 'screen/comment-detail/components/CommentCardLoading';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { CursorArgs } from '__generated__/globalTypes';
import { QGetComments, QGetCommentsVariables, QGetComments_getComments_data } from '__generated__/QGetComments';
import CommentCard from '../../comment-detail/components/CommentCard';
import CommentInput from '../components/CommentInput';

interface PostDetailComment {
  postId: string;
  authorId: string;
}

function PostDetailComment({ postId, authorId }: PostDetailComment) {
  const pageItemCount = 6;
  const me = useMeQuery();
  const [isLastPage, setIsLastPage] = useState(false);
  const [fetchCommentsQuery, commentsQuery] = useLazyQuery<QGetComments, QGetCommentsVariables>(GET_COMMENTS);

  const [commentResult, setCommentResult] = useState<QGetComments_getComments_data[]>([]);
  const [parentComment, setParentComment] = useState<QGetComments_getComments_data | null>(null);

  const getCommentHandler = async () => {
    const lastPost = commentResult?.[commentResult.length - 1];
    const cursor: CursorArgs = { id: lastPost?.id || null, createdAt: lastPost?.createdAt || null };
    const res = await fetchCommentsQuery({
      variables: {
        args: { postId },
        page: { take: pageItemCount, cursor },
      },
    });
    if (!res.data?.getComments.ok) {
      alert(res.data?.getComments.error);
      return;
    }
    if (res.data.getComments.data.length !== pageItemCount) {
      setIsLastPage(true);
    }
    setCommentResult([...commentResult, ...res.data.getComments.data]);
  };

  const getNextPage = async () => {
    if (isLastPage) {
      return;
    }
    getCommentHandler();
  };

  const addNewComment = async () => {
    setIsLastPage(false);
    setCommentResult([]);
  };

  return (
    <>
      <WrapperColumn>
        <WrapperInfinityScroll fetchHandler={getNextPage}>
          {commentResult?.map((comment) => (
            <CommentCard
              setParentComment={() => setParentComment(comment)}
              key={comment.id}
              {...comment}
              authorId={authorId}
            />
          ))}

          {commentsQuery.loading &&
            Array(pageItemCount)
              .fill('')
              .map((_) => <CommentCardLoading key={Math.random()} />)}
        </WrapperInfinityScroll>
      </WrapperColumn>
      <CommentInput
        postId={postId}
        refrechComment={addNewComment}
        parentComment={parentComment}
        setParentComment={setParentComment}
        setCommentResult={setCommentResult}
      />
    </>
  );
}

export default PostDetailComment;
