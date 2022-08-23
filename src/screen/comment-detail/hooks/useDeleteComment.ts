import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from 'apllo-gqls/comments';
import { MDeleteComment, MDeleteCommentVariables } from '__generated__/MDeleteComment';

function useDeleteComment() {
  return useMutation<MDeleteComment, MDeleteCommentVariables>(DELETE_COMMENT);
}

export default useDeleteComment;
