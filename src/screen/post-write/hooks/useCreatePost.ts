import { useMutation } from "@apollo/client";
import { CREATE_POST } from "apllo-gqls/posts";
import { MCreatePost, MCreatePostVariables } from "__generated__/MCreatePost";

function useCreatePost() {
  return useMutation<MCreatePost, MCreatePostVariables>(CREATE_POST);
}

export default useCreatePost;
