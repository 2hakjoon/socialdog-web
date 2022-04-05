import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import React, { useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { QGetComments, QGetCommentsVariables } from '__generated__/QGetComments';
import CommentCard from '../components/CommentCard';
import CommentInput from '../components/CommentInput';

interface PostDetailComment {
  postId: string;
  authorId: string;
}

function PostDetailComment({ postId, authorId }: PostDetailComment) {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const commentsQuery = useQuery<QGetComments, QGetCommentsVariables>(GET_COMMENTS, {
    variables: {
      args: { postId },
      page: { take: pageItemCount, cursor: { createdAt: `0` } },
    },
  });
  const comments = commentsQuery.data?.getComments.data;

  return (
    <>
      <WrapperColumn>
        {comments && (
          <WrapperInfinityQueryScroll
            query={commentsQuery}
            pageItemCount={pageItemCount}
            itemLimit={itemLimit}
            setItemLimit={setItemLimit}
          >
            {comments.map((comment) => (
              <CommentCard key={comment.id} {...comment} authorId={authorId} />
            ))}
          </WrapperInfinityQueryScroll>
        )}
      </WrapperColumn>
      <CommentInput postId={postId} />
    </>
  );
}

export default PostDetailComment;
