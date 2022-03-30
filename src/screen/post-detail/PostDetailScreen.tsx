import { useLazyQuery } from '@apollo/client';
import { GET_POST_DETAIL } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { routes } from 'screen/routes';
import { QGetPostDetail, QGetPostDetailVariables } from '__generated__/QGetPostDetail';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';

type Params = {
  postId: string;
};

function PostDetailScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const statePostData = state as QGetSubscribingPosts_getSubscribingPosts_data;
  const { postId } = useParams<Params>();
  // console.log(statePostData, postId);
  const [getPostDetail] = useLazyQuery<QGetPostDetail, QGetPostDetailVariables>(GET_POST_DETAIL);
  const [post, setPost] = useState<QGetSubscribingPosts_getSubscribingPosts_data>();

  // console.log(post);

  useEffect(() => {
    if (statePostData) {
      setPost(statePostData);
      return;
    }
    // console.log(postId);
    if (!postId) {
      navigate(routes.home);
      return;
    }
    getPostDetail({ variables: { args: { id: postId } } }).then((data) => setPost(data.data?.getPostDetail.data));
  }, []);

  return (
    <>
      <MainHeader />
    </>
  );
}

export default PostDetailScreen;
