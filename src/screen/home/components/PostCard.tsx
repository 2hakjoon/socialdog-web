import React, { useState } from 'react';
import { theme } from 'assets/styles/theme';
import ImageBase from 'screen/common-comp/image/ImageBase';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import TextEllipsis from 'screen/common-comp/texts/TextEllipsis';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useApolloClient, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import useToggleLike from 'hooks/useToggleLike';
import { aFewTimeAgo } from 'utils/timeformat/aFewTimeAgo';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import ProfilePhoto from 'screen/common-comp/image/ProfilePhoto';
import DropdownEllipsis from 'screen/common-comp/dropdown/DropdownEllipsis';
import ReportModal from 'screen/common-comp/report/ReportModal';
import TextLink from 'screen/common-comp/texts/TextLink';
import WrapperButton from 'screen/common-comp/wrappers/WrapperButton';

const Wrapper = styled.article`
  margin: 16px 0;
  max-width: 612px;
  width: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
`;

const TopBar = styled.div`
  width: 100%;
  height: 58px;
  border-bottom: 1px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  justify-content: space-between;
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

const EmpyBox = styled.div`
  width: 40px;
  height: 100%;
`;

function PostCard({
  id,
  user,
  address,
  photos,
  contents,
  liked,
  likes,
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
  const [modalOpen, setModalOpen] = useState(false);

  const openReportModal = () => {
    setModalOpen(true);
  };

  const closeReportModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Wrapper key={id}>
        <TopBar>
          <EmpyBox />
          <WrapperRow>
            <Link to={`${routes.home}${user.username}`} style={{ textDecoration: 'none' }}>
              <ProfilePhoto size="32px" url={user.photo ? user.photo : ''} />
            </Link>
            <TextLink
              href={`${routes.home}${user.username}`}
              text={user.username}
              m="0 8px"
              fontSize="1rem"
              fontFamily="Nanum Gothic"
              fontWeight={600}
            />
            <TextBase text={aFewTimeAgo(createdAt)} fontSize={'12px'} m="0 4px 0 0" />
            {createdAt !== updatedAt && (
              <TextBase text={'(수정됨)'} fontSize={'12px'} color={theme.color.achromatic.darkGray} />
            )}
          </WrapperRow>
          <DropdownEllipsis
            items={[
              {
                itemName: '신고하기',
                onClick: openReportModal,
              },
            ]}
          />
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
          <WrapperRow jc="space-between" w="100%" p="8px 8px 8px 0">
            <WrapperRow>
              <WrapperButton onClick={(e) => toggleLikeHandler({ id, __typename, liked, likes })}>
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
              </WrapperButton>
              <TextBase text={likes} fontWeight={500} m={'auto 8px 1px 0'} />
              {address && (
                <>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    color={theme.color.blue.primaryBlue}
                    style={{ marginRight: 10 }}
                  />
                  <TextBase text={address} fontSize="14px" fontWeight={500} />
                </>
              )}
            </WrapperRow>
          </WrapperRow>
          <Link to={`${routes.postDetailBase}${id}`}>
            <WrapperColumn ai="flex-start" p="0 0 20px 0">
              <TextEllipsis line={3}>
                <TextBase text={contents} fontSize={'0.875rem'} p={'0'} m={'0'} />
              </TextEllipsis>
              {Boolean(commentCounts) && <TextBase text={`댓글 수 : ${commentCounts}개`} m={'20px 0 0 0'} />}
            </WrapperColumn>
          </Link>
        </Contents>
      </Wrapper>
      <>{modalOpen && <ReportModal postId={id} type="POST" closeModal={closeReportModal} />}</>
    </>
  );
}

export default PostCard;
