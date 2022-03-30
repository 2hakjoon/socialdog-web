import { gql, useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { faLocationDot, faPaw, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DELETE_POST, GET_POST_DETAIL, POST_FRAGMENT } from 'apllo-gqls/posts';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import useToggleLike from 'hooks/useToggleLike';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import ImageBase from 'screen/common-comp/image/ImageBase';
import TextBase from 'screen/common-comp/texts/TextBase';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperEllipsis from 'screen/common-comp/wrappers/WrapperEllipsis';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { routes } from 'screen/routes';
import { MDeletePost, MDeletePostVariables } from '__generated__/MDeletePost';
import { QGetPostDetail, QGetPostDetailVariables } from '__generated__/QGetPostDetail';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import { QMe } from '__generated__/QMe';
import PostDetailComment from './template/PostDetailComment';

type Params = {
  postId: string;
};

function PostDetailScreen() {
  const client = useApolloClient();
  const navigate = useNavigate();
  const toggleLikeHandler = useToggleLike();
  const { postId } = useParams<Params>();
  // console.log(postId);
  const identifiedId = client.cache.identify({ id: postId, __typename: 'PostAll' });
  const cachedPost = client.readFragment({
    id: identifiedId, // The value of the to-do item's cache ID
    fragment: POST_FRAGMENT,
  });
  // console.log(cachedPost);

  const { data: meData } = useQuery<QMe>(MYPROFILE);
  const authUser = meData?.me.data;
  // console.log(authUser);

  const [deletePost] = useMutation<MDeletePost, MDeletePostVariables>(DELETE_POST);
  const [getPostDetail] = useLazyQuery<QGetPostDetail, QGetPostDetailVariables>(GET_POST_DETAIL);
  const [post, setPost] = useState<QGetSubscribingPosts_getSubscribingPosts_data>();

  const moveToPostEdit = (postId: string) => {
    navigate(`${routes.postWrite}`, { state: { ...post } });
  };

  const deletePostHandler = async (postId: string) => {
    const res = await deletePost({ variables: { args: { id: postId } } });
    if (!res.data?.deletePost.ok) {
      window.alert(res.data?.deletePost.error);
      return;
    }
    const normalizedId = client.cache.identify({ id: post?.id, __typename: post?.__typename });
    client.cache.evict({ id: normalizedId });
    client.cache.gc();
  };
  // console.log(post);

  const toggleLikeState = () => {
    if (!post) {
      return;
    }
    setPost({ ...post, liked: !post.liked });
    toggleLikeHandler({ id: post.id, __typename: post.__typename, liked: post.liked });
  };

  useEffect(() => {
    // console.log(postId);
    if (cachedPost) {
      setPost(cachedPost);
      return;
    }
    if (!postId) {
      navigate(routes.home);
      return;
    }
    getPostDetail({ variables: { args: { id: postId } } }).then((data) => setPost(data.data?.getPostDetail.data));
  }, []);

  return (
    <>
      <MainHeader />
      <BaseWrapper p="0px 16px">
        {post && (
          <WrapperColumn>
            <WrapperSquare w="100%">
              <Carousel showThumbs={false}>
                {JSON.parse(post.photos).map((photo: string) => (
                  <ImageBase url={photo} />
                ))}
              </Carousel>
            </WrapperSquare>
            <WrapperColumn ai="flex-start" w="100%">
              <WrapperRow jc="space-between" w="100%" p="8px 0">
                <WrapperRow>
                  <WrapperRow onClick={(e) => toggleLikeState()}>
                    {post.liked ? (
                      <FontAwesomeIcon
                        icon={faPaw}
                        size="2x"
                        color={theme.color.blue.primaryBlue}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPaw}
                        size="2x"
                        color={theme.color.achromatic.darkGray}
                        style={{ marginRight: 10 }}
                      />
                    )}
                  </WrapperRow>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="2x"
                    color={theme.color.blue.primaryBlue}
                    style={{ marginRight: 10 }}
                  />
                  <TextBase text={post.address} />
                </WrapperRow>
                {authUser?.id === post.user.id && (
                  <>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      color={theme.color.achromatic.black}
                      onClick={() => moveToPostEdit(post.id)}
                    />
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="lg"
                      color={theme.color.achromatic.black}
                      onClick={() => deletePostHandler(post.id)}
                    />
                  </>
                )}
              </WrapperRow>
              <WrapperEllipsis line={3}>
                <TextBase text={post.contents} />
              </WrapperEllipsis>
            </WrapperColumn>
          </WrapperColumn>
        )}
        {postId && <PostDetailComment postId={postId} />}
      </BaseWrapper>
    </>
  );
}

export default PostDetailScreen;
