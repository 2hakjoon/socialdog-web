import { useQuery } from '@apollo/client';
import { GET_COMMENT } from 'apllo-gqls/comments';
import { QGetComment, QGetCommentVariables } from '__generated__/QGetComment';

interface UseGetCommentArgs {
  commentId: string;
}

function useGetComment({ commentId }: UseGetCommentArgs) {
  const { data } = useQuery<QGetComment, QGetCommentVariables>(GET_COMMENT, {
    variables: { args: { id: commentId } },
  });
  return { comment: data?.getComment.data };
}

export default useGetComment;
