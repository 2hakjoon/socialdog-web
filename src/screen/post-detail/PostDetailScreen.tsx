import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { faLocationDot, faPaw, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DELETE_POST, GET_POST_DETAIL } from 'apllo-gqls/posts';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import useToggleLike from 'hooks/useToggleLike';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import ImageBase from 'screen/common-comp/image/ImageBase';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperEllipsis from 'screen/common-comp/wrappers/WrapperEllipsis';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { routes } from 'screen/routes';
import { MDeletePost, MDeletePostVariables } from '__generated__/MDeletePost';
import { QGetPostDetail, QGetPostDetailVariables } from '__generated__/QGetPostDetail';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import { QMe } from '__generated__/QMe';

type Params = {
  postId: string;
};

function PostDetailScreen() {
  const { cache } = useApolloClient();
  const navigate = useNavigate();
  const toggleLikeHandler = useToggleLike();
  const { postId } = useParams<Params>();
  // console.log(statePostData, postId);

  const { data: meData } = useQuery<QMe>(MYPROFILE);
  const authUser = meData?.me.data;
  console.log(authUser);

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
    const normalizedId = cache.identify({ id: post?.id, __typename: post?.__typename });
    cache.evict({ id: normalizedId });
    cache.gc();
  };
  // console.log(post);

  useEffect(() => {
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
      {post && (
        <WrapperColumn>
          <WrapperSquare w="100%">
            <Carousel showThumbs={false}>
              {JSON.parse(post.photos).map((photo: string) => (
                <ImageBase url={photo} />
              ))}
            </Carousel>
          </WrapperSquare>
          <WrapperColumn>
            <WrapperRow jc="space-between" w="100%" p="8px 0">
              <WrapperRow>
                <WrapperRow
                  onClick={(e) => toggleLikeHandler({ id: post.id, __typename: post.__typename, liked: post.liked })}
                >
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
              {authUser?.username === post.user.username && (
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
    </>
  );
}

export default PostDetailScreen;
