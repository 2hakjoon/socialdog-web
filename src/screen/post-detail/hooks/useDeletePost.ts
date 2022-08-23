import { useMutation } from "@apollo/client";
import { DELETE_POST } from "apllo-gqls/posts";
import { MDeletePost, MDeletePostVariables } from "__generated__/MDeletePost";

function useDeletePost() {
  return useMutation<MDeletePost, MDeletePostVariables>(DELETE_POST);
}

export default useDeletePost;
