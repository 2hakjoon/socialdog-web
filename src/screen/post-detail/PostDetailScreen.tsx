import { gql, useApolloClient, useQuery } from '@apollo/client';
import { faLocationDot, faPaw, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { POST_FRAGMENT } from 'apllo-gqls/posts';
import { MYPROFILE } from 'apllo-gqls/users';
import { theme } from 'assets/styles/theme';
import useToggleLike from 'common/hooks/useToggleLike';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from 'common/components/header/MainHeader';
import ImageBase from 'common/components/image/ImageBase';
import TextBase from 'common/components/texts/TextBase';
import TextExpandEllipsis from 'common/components/texts/TextExpandEllipsis';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import WrapperSquare from 'common/components/wrappers/WrapperSquare';
import { routes } from 'screen/routes';
import styled from 'styled-components';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import { QMe } from '__generated__/QMe';
import PostDetailComment from './template/PostDetailComment';
import useDeletePost from './hooks/useDeletePost';
import useGetPostDetail from './hooks/useGetPostDetail';

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 612px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: white;
`;
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

 

  const [deletePost] = useDeletePost();
  const [getPostDetail] = useGetPostDetail();
  const [post, setPost] = useState<QGetSubscribingPosts_getSubscribingPosts_data | null>();

  const moveToPostEdit = (postId: string) => {
    navigate(`${routes.postWrite}`, { state: { ...post } });
  };

  const deletePostHandler = async (postId: string) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }
    const res = await deletePost({ variables: { args: { id: postId } } });
    if (!res.data?.deletePost.ok) {
      window.alert(res.data?.deletePost.error);
      return;
    }
    const normalizedId = client.cache.identify({ id: post?.id, __typename: post?.__typename });
    client.cache.evict({ id: normalizedId });
    client.cache.gc();
    window.alert('게시글이 삭제되었습니다');
    navigate(-1);
  };
  // console.log(post);

  const toggleLikeState = () => {
    if (!post) {
      return;
    }
    if (post.liked) {
      setPost({ ...post, liked: !post.liked, likes: post.likes - 1 });
    } else if (!post.liked) {
      setPost({ ...post, liked: !post.liked, likes: post.likes + 1 });
    }
    toggleLikeHandler({ id: post.id, __typename: post.__typename, liked: post.liked, likes: post.likes });
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
      <BaseWrapper p="">
        {post && (
          <Wrapper>
            <Carousel showArrows={false} showThumbs={false} dynamicHeight showStatus={false}>
              {JSON.parse(post.photos).map((photo: string) => (
                <WrapperSquare key={`${photo}`}>
                  <ImgWrapper>
                    <ImageBase url={photo} />
                  </ImgWrapper>
                </WrapperSquare>
              ))}
            </Carousel>
            <WrapperColumn ai="flex-start" w="100%" p="10px 16px 16px 16px">
              <WrapperRow jc="space-between" w="100%" p="8px 0">
                <WrapperRow>
                  <WrapperButton onClick={(e) => toggleLikeState()}>
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
                  </WrapperButton>
                  {post.likes > 0 && <TextBase text={post.likes} fontWeight={500} m={'auto 8px 1px 0'} />}
                  {post.address && (
                    <>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        size="lg"
                        color={theme.color.blue.primaryBlue}
                        style={{ marginRight: 10 }}
                      />
                      <TextBase text={post.address} />
                    </>
                  )}
                </WrapperRow>
                {authUser?.id === post.user.id && (
                  <WrapperRow w="40px" jc="space-between">
                    <WrapperButton>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        color={theme.color.achromatic.black}
                        onClick={() => moveToPostEdit(post.id)}
                      />
                    </WrapperButton>
                    <WrapperButton>
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="lg"
                        color={theme.color.achromatic.black}
                        onClick={() => deletePostHandler(post.id)}
                      />
                    </WrapperButton>
                  </WrapperRow>
                )}
              </WrapperRow>
              <TextBase
                text={`댓글 수 ${post.commentCounts} 개`}
                fontSize={'0.875rem'}
                fontWeight={400}
                p={'0 0 6px 0'}
              />
              <TextExpandEllipsis text={post.contents} line={3} />
            </WrapperColumn>
          </Wrapper>
        )}
        {post && postId && <PostDetailComment postId={postId} authorId={post.user.id} />}
      </BaseWrapper>
    </>
  );
}

export default PostDetailScreen;
