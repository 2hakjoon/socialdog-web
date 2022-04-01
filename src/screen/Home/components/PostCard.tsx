import React from 'react';
import { theme } from 'assets/styles/theme';
import ImageBase from 'screen/common-comp/image/ImageBase';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import WrapperEllipsis from 'screen/common-comp/wrappers/WrapperEllipsis';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { gql, makeReference, useApolloClient, useMutation } from '@apollo/client';
import { MToggleLikePost, MToggleLikePostVariables } from '__generated__/MToggleLikePost';
import { TOGGLE_LIKE_POST } from 'apllo-gqls/posts';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import useToggleLike from 'hooks/useToggleLike';

const Wrapper = styled.article`
  margin: 16px 0;
  max-width: 612px;
  width: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 58px;
  border-bottom: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 0 16px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const OnClickWrapper = styled.button`
  border: none;
  background-color: white;
`;

function PostCard({
  id,
  user,
  address,
  photos,
  contents,
  liked,
  placeId,
  createdAt,
  updatedAt,
  __typename,
}: QGetSubscribingPosts_getSubscribingPosts_data) {
  // const [toggleLike] = useMutation<MToggleLikePost, MToggleLikePostVariables>(TOGGLE_LIKE_POST);
  const toggleLikeHandler = useToggleLike();
  const client = useApolloClient();
  const navigate = useNavigate();
  const parsedPhotos: string[] = JSON.parse(photos);

  // const toggleLikeHandler = async (postId: string) => {
  //   const res = await toggleLike({
  //     variables: { args: { postId } },
  //   });
  //   console.log(res);
  //   if (!res.data?.toggleLikePost.ok) {
  //     window.alert(res.data?.toggleLikePost.error);
  //     return;
  //   }
  //   // 좋아요 버튼 토글
  //   client.cache.writeFragment({
  //     id: client.cache.identify({ id, __typename }),
  //     fragment: gql`
  //       fragment post on PostAll {
  //         liked
  //       }
  //     `,
  //     data: {
  //       liked: !liked,
  //     },
  //   });
  //   // 좋아요 누르면, getMyLikedPosts에 추가 및 삭제
  //   client.cache.modify({
  //     id: client.cache.identify(makeReference('ROOT_QUERY')),
  //     fields: {
  //       getMyLikedPosts(existing) {
  //         return {
  //           ...existing,
  //           data: liked
  //             ? existing.data.filter(
  //                 (post: { __ref: string }) => post.__ref !== client.cache.identify({ id, __typename }),
  //               )
  //             : [{ __ref: client.cache.identify({ id, __typename }) }, ...existing.data],
  //         };
  //       },
  //     },
  //   });
  // };

  const moveToPostDetail = () => {
    navigate(`${routes.postDetailBase}${id}`);
  };

  return (
    <Wrapper key={id}>
      <TopBar>
        <ImageRound size="30px" url={user.photo ? user.photo : ''} />
        <TextBase text={user.username} m="0 8px" fontFamily="nanum" fontWeight={700} />
        {createdAt !== updatedAt && (
          <TextBase text={'수정됨.'} fontSize={'10px'} color={theme.color.achromatic.darkGray} />
        )}
      </TopBar>
      <Carousel showThumbs={false} dynamicHeight>
        {parsedPhotos.map((photo, idx) => (
          <WrapperSquare key={photo}>
            <ImgWrapper>
              <ImageBase url={photo} />
            </ImgWrapper>
          </WrapperSquare>
        ))}
      </Carousel>
      <Contents>
        <WrapperRow jc="space-between" w="100%" p="8px 0">
          <WrapperRow>
            <OnClickWrapper onClick={(e) => toggleLikeHandler({ id, __typename, liked })}>
              {liked ? (
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
            </OnClickWrapper>
            <FontAwesomeIcon
              icon={faLocationDot}
              size="2x"
              color={theme.color.blue.primaryBlue}
              style={{ marginRight: 10 }}
            />
            <TextBase text={address} />
          </WrapperRow>
        </WrapperRow>
        <WrapperEllipsis line={3} onClick={moveToPostDetail}>
          <TextBase text={contents} />
        </WrapperEllipsis>
      </Contents>
    </Wrapper>
  );
}

export default PostCard;
