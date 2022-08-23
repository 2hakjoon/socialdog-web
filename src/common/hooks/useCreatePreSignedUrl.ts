import { useMutation } from "@apollo/client"
import { CREATE_PRESIGNED_URL } from "apllo-gqls/posts"
import { MCreatePreSignedUrls, MCreatePreSignedUrlsVariables } from "__generated__/MCreatePreSignedUrls"


function useCreatePreSignedUrl () {
  return useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL)
}

export default useCreatePreSignedUrl