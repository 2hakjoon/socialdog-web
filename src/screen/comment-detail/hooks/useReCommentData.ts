import { useLazyQuery } from '@apollo/client';
import { GET_RECOMMENTS } from 'apllo-gqls/comments';
import { QGetReComments, QGetReCommentsVariables } from '__generated__/QGetReComments';

function useReCommentData() {
  return useLazyQuery<QGetReComments, QGetReCommentsVariables>(GET_RECOMMENTS);
}

export default useReCommentData;
