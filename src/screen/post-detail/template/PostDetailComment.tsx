import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import dayjs from 'dayjs';
import { useMeQuery } from 'hooks/useMeQuery';
import React, { useEffect, useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { CursorArgs } from '__generated__/globalTypes';
import { QGetComments, QGetCommentsVariables, QGetComments_getComments_data } from '__generated__/QGetComments';
import CommentCard from '../components/CommentCard';
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
  const comments = commentsQuery.data?.getComments.data;
  const [commentResult, setCommentResult] = useState<QGetComments_getComments_data[]>([]);

  const getCommentHandler = async () => {
    const lastPost = comments?.[comments.length - 1];
    const cursor: CursorArgs = { id: lastPost?.id, createdAt: lastPost?.createdAt };
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

  const addNewComment = async (content: string) => {
    if (!me) {
      return;
    }
    // console.log(content);
    setCommentResult([
      {
        id: dayjs().toString(),
        content,
        __typename: 'Comments',
        createdAt: dayjs().millisecond().toString(),
        updatedAt: dayjs().millisecond().toString(),
        reCommentCounts: 0,
        user: { ...me },
      },
      ...commentResult,
    ]);
  };

  return (
    <>
      <WrapperColumn>
        <WrapperInfinityScroll fetchHandler={getNextPage}>
          {commentResult?.map((comment) => (
            <CommentCard key={comment.id} {...comment} authorId={authorId} />
          ))}
        </WrapperInfinityScroll>
      </WrapperColumn>
      <CommentInput postId={postId} addComment={addNewComment} />
    </>
  );
}

export default PostDetailComment;
