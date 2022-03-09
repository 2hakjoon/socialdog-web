import React, { useEffect, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import { GET_MYPOSTS, GET_USER_POSTS } from 'apllo-gqls/posts';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { QGetMyPosts, QGetMyPostsVariables } from '__generated__/QGetMyPosts';
import PostSmallBox from './components/PostSmallBox';
import styled from 'styled-components';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'screen/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import { SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import SubscriberAndRequests from './templates/SubscriberAndRequests';
import SubscribingAndRequests from './templates/SubscribingAndRequests';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';
import { QGetUserPosts, QGetUserPostsVariables } from '__generated__/QGetUserPosts';
import { QMeAll } from '__generated__/QMeAll';

const PostsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0px 4px;
`;

type Params = {
  username: string;
};

function ProfileScreen() {
  const navigate = useNavigate();
  const [postsLimit, setPostsLimit] = useState<number>(3);
  const { username } = useParams<Params>();
  if (!username) {
    navigate(routes.home);
    return <></>;
  }
  const { data: authUserData } = useQuery<QMeAll>(MYPROFILE);
  const authUser = authUserData?.me.data;

  const { data: userData, loading: userDataLoading } = useQuery<QGetUserProfile, QGetUserProfileVariables>(
    GET_USER_PROFILE,
    {
      variables: { args: { username } },
    },
  );
  const user = userData?.getUserProfile.data;
  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { args: { username, offset: 0, limit: postsLimit } },
  });
  console.log(postsData, postsLoading);
  const posts = postsData?.getUserPosts.data;
  const [modalType, setModalType] = useState<string | null>(null);

  // 다음페이지 데이터 요청
  useEffect(() => {
    if (posts && postsLimit > 3) {
      if (posts.length + 3 === postsLimit) {
        fetchPostsMore({ variables: { args: { username, offset: posts?.length, limit: 3 } } });
      }
    }
  }, [postsData]);

  const moveToProfileEdit = () => {
    navigate(routes.profileEdit);
  };

  const toNextPage = async () => {
    setPostsLimit((prev) => prev + 3);
  };

  const openSubscribingModal = () => {
    setModalType(SUBSCRIBING);
  };
  const openSubscriberModal = () => {
    setModalType(SUBSCRIBER);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <>
      {userDataLoading ? (
        <TextBase text={'로딩 중'} />
      ) : (
        <>
          <MainHeader />
          <BaseWrapper>
            {user && (
              <>
                <WrapperRow w="100%" jc="space-around" p={'20px 20px 30px 20px'} bc={'white'}>
                  <WrapperColumn
                    h="140px"
                    jc="space-around"
                    onClick={authUser?.id === user.id ? moveToProfileEdit : () => {}}
                  >
                    <ImageRound size="90px" url={user.photo || ''} />
                    <WrapperRow>
                      <TextBase text={user.username} p="0 6px" />
                      <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                    </WrapperRow>
                  </WrapperColumn>
                  <WrapperColumn
                    h="50px"
                    jc="space-around"
                    onClick={authUser?.id === user.id ? openSubscribingModal : () => {}}
                  >
                    <TextBase text={'구독중'} />
                    <TextBase text={user.subscribings} />
                  </WrapperColumn>
                  <WrapperColumn
                    h="50px"
                    jc="space-around"
                    onClick={authUser?.id === user.id ? openSubscriberModal : () => {}}
                  >
                    <TextBase text={'삼촌-이모들'} />
                    <TextBase text={user.subscribers} />
                  </WrapperColumn>
                </WrapperRow>
              </>
            )}
            <PostsGrid>
              {posts?.map((post) => (
                <WrapperSquare key={post.id}>
                  <BaseWrapper>
                    <PostSmallBox {...post} />
                  </BaseWrapper>
                </WrapperSquare>
              ))}
            </PostsGrid>
            <button type="button" onClick={toNextPage}>
              더 불러오기
            </button>
          </BaseWrapper>
        </>
      )}
      {modalType && (
        <ModalBackground closeModal={closeModal}>
          {modalType === SUBSCRIBING && <SubscribingAndRequests closeModal={closeModal} />}
          {modalType === SUBSCRIBER && <SubscriberAndRequests closeModal={closeModal} />}
        </ModalBackground>
      )}
    </>
  );
}

export default ProfileScreen;
