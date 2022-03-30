import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import React, { useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { QGetComments, QGetCommentsVariables } from '__generated__/QGetComments';
import CommentCard from '../components/CommentCard';

interface PostDetailComment {
  postId: string;
}

function PostDetailComment({ postId }: PostDetailComment) {
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
    <WrapperColumn>
      {comments && (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </>
      )}
    </WrapperColumn>
  );
}

export default PostDetailComment;
