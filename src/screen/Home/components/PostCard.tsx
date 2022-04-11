import React from 'react';
import { theme } from 'assets/styles/theme';
import ImageBase from 'screen/common-comp/image/ImageBase';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import useToggleLike from 'hooks/useToggleLike';
import { aFewTimeAgo } from 'utils/timeformat/aFewTimeAgo';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import TextEllipsis from 'screen/common-comp/texts/TextEllipsis';

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
  commentCounts,
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

  const moveToPostDetail = () => {
    navigate(`${routes.postDetailBase}${id}`);
  };

  return (
    <Wrapper key={id}>
      <TopBar>
        <ImageRound size="30px" url={user.photo ? user.photo : ''} />
        <TextBase text={user.username} m="0 8px" fontFamily="Nanum-Gothic" fontWeight={700} />
        <TextBase text={aFewTimeAgo(createdAt)} fontSize={'12px'} m="0 4px 0 0" />
        {createdAt !== updatedAt && (
          <TextBase text={'(수정됨)'} fontSize={'12px'} color={theme.color.achromatic.darkGray} />
        )}
      </TopBar>
      <Carousel showThumbs={false} dynamicHeight showStatus={false}>
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
                  style={{ marginRight: 6 }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPaw}
                  size="2x"
                  color={theme.color.achromatic.darkGray}
                  style={{ marginRight: 6 }}
                />
              )}
            </OnClickWrapper>
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              color={theme.color.blue.primaryBlue}
              style={{ marginRight: 10 }}
            />
            <TextBase text={address} fontSize="14px" />
          </WrapperRow>
        </WrapperRow>
        <WrapperColumn onClick={moveToPostDetail} ai="flex-start" p="0 0 20px 0">
          <TextEllipsis lineHeight={1.2} line={3}>
            <TextBase text={contents} />
          </TextEllipsis>
          {Boolean(commentCounts) && <TextBase text={`댓글 수 : ${commentCounts}개`} />}
        </WrapperColumn>
      </Contents>
    </Wrapper>
  );
}

export default PostCard;
