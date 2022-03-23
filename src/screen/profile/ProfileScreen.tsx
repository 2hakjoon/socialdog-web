import React, { useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'screen/routes';
import { useNavigate, useParams } from 'react-router-dom';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import { BLOCKANDREJECT, SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import SubscriberAndRequests from './templates/SubscriberAndRequests';
import SubscribingAndRequests from './templates/SubscribingAndRequests';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';
import { QMe } from '__generated__/QMe';
import { MRequestSubscribe, MRequestSubscribeVariables } from '__generated__/MRequestSubscribe';
import { CANCEL_SUBSCRIBE, CHANGE_BLOCKSTATE, REQUEST_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { BlockState, SubscribeRequestState } from '__generated__/globalTypes';
import { MChangeBlockState, MChangeBlockStateVariables } from '__generated__/MChangeBlockState';
import { McancelSubscribing, McancelSubscribingVariables } from '__generated__/McancelSubscribing';
import BlockAndRejected from './templates/BlockAndRejected';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { theme } from 'assets/styles/theme';
import MyPosts from './templates/MyPosts';
import MyLikedPosts from './templates/MyLikedPosts';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';

type Params = {
  username: string;
};

type PostType = 'MY' | 'LIKED';

function ProfileScreen() {
  const { cache } = useApolloClient();
  const navigate = useNavigate();
  const [postsType, setPostType] = useState<PostType>('MY');
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

  const {
    data: userData,
    loading: userDataLoading,
    refetch,
  } = useQuery<QGetUserProfile, QGetUserProfileVariables>(GET_USER_PROFILE, {
    variables: { args: { username } },
  });
  const user = userData?.getUserProfile.data;
  const userProfileState = userData?.getUserProfile;
  console.log('user', user, userProfileState);

  const [modalType, setModalType] = useState<string | null>(null);
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
    if (!res.data?.changeBlockState.ok) {
      window.alert(res.data?.changeBlockState.error);
      // return;
    }
    const identifiedId = cache.identify({ id: user?.id, __typename: 'UserProfile' });
    cache.modify({
      fields: {
        getMyBlockingUsers(existing: { data: [{ __ref: string }] }) {
          if (!existing) {
            return null;
          }
          return blockState
            ? { ...existing, data: [{ __ref: identifiedId }, ...existing.data] }
            : existing.data.filter((data) => data.__ref !== identifiedId);
        },
      },
    });
    refetch();
  };

  const oncancelSubscribing = async (to: string) => {
    const res = await cancelSubscribing({ variables: { args: { to } } });
    console.log(res);
    if (!res.data?.cancelSubscribing.ok) {
      window.alert(res.data?.cancelSubscribing.error);
      // return
    }
    const identifiedId = cache.identify({ id: user?.id, __typename: 'UserProfile' });
    cache.modify({
      fields: {
        getMySubscribings(existing: { data: [{ __ref: string }] }) {
          if (!existing) {
            return null;
          }
          return existing.data.filter((data) => data.__ref !== identifiedId);
        },
      },
    });
    const identifiedAuthUserId = cache.identify({ id: authUser?.id, __typename: 'UserProfileAll' });
    cache.evict({ id: identifiedAuthUserId });
    cache.gc();
    refetch();
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
                    <ButtonSmallBlue title={'차단-거절 관리'} onClick={() => openBlockAndRejected()} />
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
          {isMyProfile() && (
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
          )}
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
                <>
                  {isSelectedPostType('MY') && <MyPosts username={username} itemsCount={12} />}
                  {isSelectedPostType('LIKED') && <MyLikedPosts itemsCount={12} />}
                </>
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
