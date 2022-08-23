import { useLazyQuery } from "@apollo/client";
import { GET_POST_DETAIL } from "apllo-gqls/posts";
import { Navigate, useNavigate } from "react-router-dom";
import { QGetPostDetail, QGetPostDetailVariables } from "__generated__/QGetPostDetail";



function useGetPostDetail () {
  const navigate = useNavigate();

  const onPostDetailComplete = (result: QGetPostDetail) => {
    if (!result.getPostDetail.ok) {
      window.alert(result.getPostDetail.error);
      navigate(-1);
    }
  };
  return useLazyQuery<QGetPostDetail, QGetPostDetailVariables>(GET_POST_DETAIL, {
    onCompleted: onPostDetailComplete,
  });
}

export default useGetPostDetail;