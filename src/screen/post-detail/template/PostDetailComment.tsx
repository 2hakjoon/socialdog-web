import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import React, { useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { QGetComments, QGetCommentsVariables } from '__generated__/QGetComments';
import CommentCard from '../components/CommentCard';
import CommentInput from '../components/CommentInput';

interface PostDetailComment {
  postId: string;
  authorId: string;
}

function PostDetailComment({ postId, authorId }: PostDetailComment) {
  const pageItemCount = 6;
  const [pageLimit, setPageLimit] = useState(pageItemCount);
  const { data: commentsData } = useQuery<QGetComments, QGetCommentsVariables>(GET_COMMENTS, {
    variables: {
      args: { postId },
      page: { take: pageItemCount, cursor: { createdAt: `0` } },
    },
  });
  const comments = commentsData?.getComments.data;
  console.log(commentsData);
  return (
    <>
      <WrapperColumn>
        {comments && (
          <>
            {comments.map((comment) => (
              <CommentCard key={comment.id} {...comment} authorId={authorId} />
            ))}
          </>
        )}
      </WrapperColumn>
      <CommentInput postId={postId} />
    </>
  );
}

export default PostDetailComment;
