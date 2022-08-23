import { useMutation } from "@apollo/client";
import { EDIT_POST } from "apllo-gqls/posts";
import { MEditPost, MEditPostVariables } from "__generated__/MEditPost";



function useEditPost() {
return useMutation<MEditPost, MEditPostVariables>(EDIT_POST)
}
export default useEditPost;