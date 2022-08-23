import { useLazyQuery } from "@apollo/client";
import { GET_COMMENTS } from "apllo-gqls/comments";
import { QGetComments, QGetCommentsVariables } from "__generated__/QGetComments";



function useGetComments() {
  return useLazyQuery<QGetComments, QGetCommentsVariables>(GET_COMMENTS);
}

export default useGetComments