import React from 'react';
import { theme } from 'assets/styles/theme';
import ImageBase from 'screen/common-comp/image/ImageBase';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faLocationDot, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import WrapperEllipsis from 'screen/common-comp/wrappers/WrapperEllipsis';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { useMutation } from '@apollo/client';
import { MToggleLikePost, MToggleLikePostVariables } from '__generated__/MToggleLikePost';
import { TOGGLE_LIKE_POST } from 'apllo-gqls/posts';

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
  border: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
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

function PostCard({ id, user, address, photos, contents, isLiked }: QGetSubscribingPosts_getSubscribingPosts_data) {
  const [toggleLike] = useMutation<MToggleLikePost, MToggleLikePostVariables>(TOGGLE_LIKE_POST);
  const parsedPhotos: string[] = JSON.parse(photos);

  const toggleLikeHandler = async (postId: string) => {
    const res = await toggleLike({ variables: { args: { postId } } });
    console.log(res);
  };

  return (
    <Wrapper key={id}>
      <TopBar>
        <ImageRound size="30px" url={user.photo ? user.photo : ''} />
        <TextBase text={user.username} m="0 8px" />
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
            <OnClickWrapper onClick={() => toggleLikeHandler(id)}>
              {isLiked ? (
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
          <FontAwesomeIcon icon={faEllipsisH} size="2x" color={theme.color.achromatic.black} />
        </WrapperRow>
        <WrapperEllipsis line={3}>
          <TextBase text={contents} />
        </WrapperEllipsis>
      </Contents>
    </Wrapper>
  );
}

export default PostCard;
