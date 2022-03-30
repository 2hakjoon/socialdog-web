import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from 'apllo-gqls/comments';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { QGetComments, QGetCommentsVariables } from '__generated__/QGetComments';

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
  console.log(commentsData);
  return <WrapperColumn>댓글</WrapperColumn>;
}

export default PostDetailComment;
