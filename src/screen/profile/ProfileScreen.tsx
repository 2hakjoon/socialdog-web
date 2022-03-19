import React, { useEffect, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import PostSmallBox from './components/PostSmallBox';
import styled from 'styled-components';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'screen/routes';
import { useNavigate, useParams } from 'react-router-dom';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import { BLOCKANDREJECT, SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import SubscriberAndRequests from './templates/SubscriberAndRequests';
import SubscribingAndRequests from './templates/SubscribingAndRequests';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';
import { QGetUserPosts, QGetUserPostsVariables } from '__generated__/QGetUserPosts';
import { QMe } from '__generated__/QMe';
import { MRequestSubscribe, MRequestSubscribeVariables } from '__generated__/MRequestSubscribe';
import { CANCEL_SUBSCRIBE, CHANGE_BLOCKSTATE, REQUEST_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { BlockState, SubscribeRequestState } from '__generated__/globalTypes';
import { MChangeBlockState, MChangeBlockStateVariables } from '__generated__/MChangeBlockState';
import { McancelSubscribing, McancelSubscribingVariables } from '__generated__/McancelSubscribing';
import BlockAndRejected from './templates/BlockAndRejected';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { theme } from 'assets/styles/theme';

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

type PostType = 'MY' | 'LIKED';

function ProfileScreen() {
  const pageItemsCount = 12;
  const navigate = useNavigate();
  const [postsType, setPostType] = useState<PostType>('MY');
  const [postsLimit, setPostsLimit] = useState<number>(pageItemsCount);
  // console.log('postsLimit', postsLimit);
  const { username } = useParams<Params>();
  if (!username) {
    navigate(routes.home);
    return <></>;
  }
  const [requestSubscribe] = useMutation<MRequestSubscribe, MRequestSubscribeVariables>(REQUEST_SUBSCRIBE);
  const [changeBlockState] = useMutation<MChangeBlockState, MChangeBlockStateVariables>(CHANGE_BLOCKSTATE);
  const [cancelSubscribing] = useMutation<McancelSubscribing, McancelSubscribingVariables>(CANCEL_SUBSCRIBE);
  const { data: authUserData } = useQuery<QMe>(MYPROFILE);
  const authUser = authUserData?.me.data;

  const { data: userData, loading: userDataLoading } = useQuery<QGetUserProfile, QGetUserProfileVariables>(
    GET_USER_PROFILE,
    {
      variables: { args: { username } },
    },
  );
  const user = userData?.getUserProfile.data;
  const userProfileState = userData?.getUserProfile;
  // console.log('user', user, userProfileState);

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { offset: 0, limit: postsLimit } },
    notifyOnNetworkStatusChange: true,
  });

  // console.log('postsData :', postsData, postsLoading);
  const posts = postsData?.getUserPosts.data;
  // console.log(posts);

  const [modalType, setModalType] = useState<string | null>(null);

  // 다음페이지 데이터 요청
  useEffect(() => {
    // console.log('useEffect', posts?.length, pageItemsCount, postsLimit);
    if (posts && postsLimit > pageItemsCount) {
      if (posts.length + pageItemsCount === postsLimit) {
        fetchPostsMore({
          variables: {
            username,
            page: { offset: posts?.length || 0, limit: pageItemsCount },
          },
        });
        console.log('fetched');
      }
    }
  }, [posts]);

  // 사용자 프로필 이동시마다 페이지 카운트 초기화
  useEffect(() => {
    setPostsLimit(pageItemsCount);
  }, [username]);

  // 무한스크롤 handling함수
  const fetchNextPage = () => {
    if (!postsError) {
      setPostsLimit((prev) => prev + pageItemsCount);
    }
  };

  // 구독 요청 함수
  const onRequestSubscribe = async (toId: string) => {
    const res = await requestSubscribe({ variables: { args: { to: toId } } });
    // console.log(res);
  };

  // 유저 차단상태 변경
  const changeUserBlock = async (toUsername: string, blockState: boolean) => {
    const res = await changeBlockState({
      variables: { args: { username: toUsername, block: blockState } },
    });
    console.log(res);
  };

  const oncancelSubscribing = async (to: string) => {
    const res = await cancelSubscribing({ variables: { args: { to } } });
    console.log(res);
  };

  const isMyProfile = () => {
    return authUser?.id === user?.id;
  };

  const moveToProfileEdit = () => {
    navigate(routes.profileEdit);
  };

  const openSubscribingModal = () => {
    setModalType(SUBSCRIBING);
  };
  const openSubscriberModal = () => {
    setModalType(SUBSCRIBER);
  };
  const openBlockAndRejected = () => {
    setModalType(BLOCKANDREJECT);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const isSubscribeReqested = () => {
    return userProfileState?.subscribeRequested === SubscribeRequestState.REQUESTED;
  };
  const isSubscribeConfrimed = () => {
    return userProfileState?.subscribeRequested === SubscribeRequestState.CONFIRMED;
  };
  const isNotSubscribeReqested = () => {
    return userProfileState?.subscribeRequested === SubscribeRequestState.NONE;
  };

  const isBlokingPerson = () => {
    return userProfileState?.blocking === BlockState.BLOCKING;
  };

  const isProfileOpened = () => {
    if (username === authUser?.username) {
      return true;
    }
    // 프로필이 open이 false이지만, 구독관계일경우 null값으로 반환됨. 그래서 bool일때는 bool을반환, null은 true
    return typeof userProfileState?.profileOpened === 'boolean' ? userProfileState?.profileOpened : true;
  };

  const isSelectedPostType = (type: PostType) => {
    return type === postsType;
  };

  return (
    <>
      <>
        <MainHeader />
        <BaseWrapper>
          {user && (
            <>
              <WrapperRow w="100%" jc="space-around" p={'20px 20px 30px 20px'} bc={'white'}>
                <WrapperColumn h="140px" jc="space-around" onClick={isMyProfile() ? moveToProfileEdit : () => {}}>
                  <ImageRound size="90px" url={user.photo || ''} />
                  <WrapperRow>
                    <TextBase text={user.username} p="0 6px" />
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                  </WrapperRow>
                </WrapperColumn>
                <WrapperColumn jc="space-around">
                  <WrapperRow>
                    <WrapperColumn h="50px" jc="space-around" onClick={isMyProfile() ? openSubscribingModal : () => {}}>
                      <TextBase text={'구독중'} />
                      <TextBase text={user.subscribings || 0} />
                    </WrapperColumn>
                    <WrapperColumn h="50px" jc="space-around" onClick={isMyProfile() ? openSubscriberModal : () => {}}>
                      <TextBase text={'삼촌-이모들'} />
                      <TextBase text={user.subscribers || 0} />
                    </WrapperColumn>
                  </WrapperRow>
                  {isMyProfile() ? (
                    <button type="button" onClick={() => openBlockAndRejected()}>
                      차단-거절 관리
                    </button>
                  ) : (
                    <WrapperRow w="100%" jc="space-between" p="16px 0 0 0">
                      {isSubscribeConfrimed() && (
                        <button type="button" onClick={() => oncancelSubscribing(user.id)}>
                          구독취소
                        </button>
                      )}
                      {isSubscribeReqested() && <TextBase text={'구독 신청 보냄'} />}
                      {isNotSubscribeReqested() && (
                        <button type="button" onClick={() => onRequestSubscribe(user.id)}>
                          구독신청
                        </button>
                      )}
                      {isBlokingPerson() ? (
                        <button type="button" onClick={() => changeUserBlock(username, false)}>
                          차단해제
                        </button>
                      ) : (
                        <button type="button" onClick={() => changeUserBlock(username, true)}>
                          차단
                        </button>
                      )}
                    </WrapperRow>
                  )}
                </WrapperColumn>
              </WrapperRow>
            </>
          )}
          <WrapperRow h="60px" w="100%" jc="space-around">
            <FontAwesomeIcon
              icon={faIdBadge}
              size="2x"
              color={isSelectedPostType('MY') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              onClick={() => setPostType('MY')}
            />
            <FontAwesomeIcon
              icon={faPaw}
              size="2x"
              color={isSelectedPostType('LIKED') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              onClick={() => setPostType('LIKED')}
            />
          </WrapperRow>
          {isBlokingPerson() ? (
            <>
              <TextBase text={'차단한 계정입니다'} />
              <button type="button" onClick={() => changeUserBlock(username, false)}>
                차단해제
              </button>
            </>
          ) : (
            <>
              {isProfileOpened() ? (
                <WrapperInfinityScroll fetchHandler={fetchNextPage}>
                  <PostsGrid>
                    {posts?.map((post) => (
                      <WrapperSquare key={post.id}>
                        <BaseWrapper>
                          <PostSmallBox {...post} />
                        </BaseWrapper>
                      </WrapperSquare>
                    ))}
                    {postsLoading &&
                      Array(pageItemsCount)
                        .fill('')
                        .map(() => (
                          <WrapperSquare key={Math.random()}>
                            <BaseWrapper>
                              <PostSmallBox photos="" __typename="Posts" id="" />
                            </BaseWrapper>
                          </WrapperSquare>
                        ))}
                  </PostsGrid>
                </WrapperInfinityScroll>
              ) : (
                <TextBase text={'비공개 계정입니다.'} />
              )}
            </>
          )}
        </BaseWrapper>
      </>
      {modalType && (
        <ModalBackground closeModal={closeModal}>
          {modalType === SUBSCRIBING && <SubscribingAndRequests closeModal={closeModal} />}
          {modalType === SUBSCRIBER && <SubscriberAndRequests closeModal={closeModal} />}
          {modalType === BLOCKANDREJECT && <BlockAndRejected closeModal={closeModal} />}
        </ModalBackground>
      )}
    </>
  );
}

export default ProfileScreen;
