import { useApolloClient } from '@apollo/client';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useEvictCache from 'common/hooks/useEvictCache';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonSmallBlue from 'common/components/button/ButtonSmallBlue';
import ButtonSmallWhite from 'common/components/button/ButtonSmallWhite';
import DropdownEllipsis from 'common/components/dropdown/DropdownEllipsis';
import ProfilePhoto from 'common/components/image/ProfilePhoto';
import ModalBackground from 'common/components/modal/ModalBackground';
import ReportModal from 'common/components/report/ReportModal';
import TextBase from 'common/components/texts/TextBase';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { BLOCKANDREJECT, REPORT_USER, SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import { BlockState, SubscribeRequestState } from '__generated__/globalTypes';
import { QGetUserProfile_getUserProfile, QGetUserProfile_getUserProfile_data } from '__generated__/QGetUserProfile';
import { Params } from '../ProfileScreen';
import BlockAndRejected from './BlockAndRejected';
import SubscriberAndRequests from './SubscriberAndRequests';
import SubscribingAndRequests from './SubscribingAndRequests';
import useMyProfile from 'common/hooks/useMyProfile';
import useRequestSubscribe from '../hooks/useRequestSubscribe';
import useCancelSubscribing from '../hooks/useCancelSubscribing';
import useChangeBlockState from '../hooks/useChangeBlockState';

interface IUserProfileTemplate {
  user: QGetUserProfile_getUserProfile_data;
  userProfileState: QGetUserProfile_getUserProfile | undefined;
}

function UserProfileTemplate({ user, userProfileState }: IUserProfileTemplate) {
  const { username } = useParams<Params>();
  const evictCache = useEvictCache();
  const { cache } = useApolloClient();
  const { authUser } = useMyProfile();
  const [requestSubscribe] = useRequestSubscribe();
  const [cancelSubscribing] = useCancelSubscribing();
  const [changeBlockState] = useChangeBlockState();
  const [modalType, setModalType] = useState<string | null>(null);

  // 구독 요청 함수
  const onRequestSubscribe = async (toId: string) => {
    const res = await requestSubscribe({ variables: { args: { to: toId } } });
    // console.log(res);
    if (!res.data?.requestSubscribe.ok) {
      window.alert(res.data?.requestSubscribe.error);
    }
    const identifiedId = cache.identify({ id: user?.id, __typename: 'UserProfile' });
    cache.modify({
      fields: {
        getSubscribingRequests(existing: { data: [{ __ref: string }] }) {
          if (!existing) {
            return null;
          }
          return { ...existing, data: [{ __ref: identifiedId }, ...existing.data] };
        },
      },
    });
    if (user) {
      evictCache(user.id, 'UserProfile');
    }
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
            : { ...existing, data: existing.data.filter((data) => data.__ref !== identifiedId) };
        },
      },
    });
    if (user) {
      evictCache(user.id, 'UserProfile');
    }
  };

  // 구독 취소
  const oncancelSubscribing = async (to: string) => {
    const res = await cancelSubscribing({ variables: { args: { to } } });
    // console.log(res);
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
    if (user) {
      evictCache(user.id, 'UserProfile');
    }
  };

  const closeModal = () => {
    setModalType(null);
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
  const isMyProfile = () => {
    return authUser?.id === user?.id;
  };

  const isBlokingPerson = () => {
    return userProfileState?.blocking === BlockState.BLOCKING;
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

  const openReportUserModal = () => {
    setModalType(REPORT_USER);
  };

  const closeReportUserModal = () => {
    setModalType(null);
  };

  return (
    <>
      {user && username && (
        <>
          {!isMyProfile() && (
            <WrapperRow w="100%" jc="flex-end" p="10px" ai="center">
              <DropdownEllipsis items={[{ itemName: '신고하기', onClick: openReportUserModal }]} />
            </WrapperRow>
          )}
          <WrapperRow w="100%" jc="space-around" p={'20px 20px 30px 20px'} bc={'white'}>
            <WrapperColumn h="140px" jc="space-around">
              <ProfilePhoto size="80px" url={user.photo} />
              <WrapperRow>
                <TextBase text={user.username} p="0 6px" data-cy="text-username" />
                {isMyProfile() && (
                  <Link to={routes.profileEdit} data-cy="link-edit-profile">
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" color="black" />
                  </Link>
                )}
              </WrapperRow>
            </WrapperColumn>
            <WrapperColumn jc="space-around" h={'100%'}>
              <WrapperRow jc="space-around" w="160px" h={'100%'} p={'0 0 20px 0'}>
                <WrapperButton
                  fd="column"
                  h="50px"
                  jc="space-around"
                  onClick={isMyProfile() ? openSubscribingModal : () => {}}
                  data-cy="btn-subscribings-modal"
                >
                  <TextBase text={'구독중'} />
                  <TextBase text={user.subscribings || 0} />
                </WrapperButton>
                <WrapperButton
                  fd="column"
                  h="50px"
                  jc="space-around"
                  onClick={isMyProfile() ? openSubscriberModal : () => {}}
                  data-cy="btn-subscribers-modal"
                >
                  <TextBase text={'구독자'} />
                  <TextBase text={user.subscribers || 0} />
                </WrapperButton>
              </WrapperRow>
              {isMyProfile() ? (
                <ButtonSmallBlue
                  title={'차단-거절 관리'}
                  onClick={() => openBlockAndRejected()}
                  data-cy="btn-block-reject-modal"
                />
              ) : (
                <WrapperRow w="100%" jc="space-between" p="16px 0 0 0">
                  {isSubscribeConfrimed() && (
                    <ButtonSmallWhite
                      title="구독취소"
                      onClick={() => oncancelSubscribing(user.id)}
                      data-cy="btn-cancel-subscribe"
                    />
                  )}
                  {isSubscribeReqested() && <TextBase text={'구독 신청 보냄'} data-cy="text-subscribe-requested" />}
                  {isNotSubscribeReqested() && (
                    <ButtonSmallBlue
                      title="구독신청"
                      onClick={() => onRequestSubscribe(user.id)}
                      data-cy="btn-request-subscribe"
                    />
                  )}
                  {isBlokingPerson() ? (
                    <ButtonSmallBlue
                      title="차단해제"
                      onClick={() => changeUserBlock(username, false)}
                      data-cy="btn-unblock"
                    />
                  ) : (
                    <ButtonSmallWhite
                      title="차단"
                      onClick={() => changeUserBlock(username, true)}
                      data-cy="btn-block"
                    />
                  )}
                </WrapperRow>
              )}
            </WrapperColumn>
          </WrapperRow>
          <>
            {modalType && (
              <ModalBackground closeModal={closeModal}>
                {modalType === SUBSCRIBING && <SubscribingAndRequests closeModal={closeModal} />}
                {modalType === SUBSCRIBER && <SubscriberAndRequests closeModal={closeModal} />}
                {modalType === BLOCKANDREJECT && <BlockAndRejected closeModal={closeModal} />}
                {modalType === REPORT_USER && (
                  <ReportModal type="USER" userId={user.id} closeModal={closeReportUserModal} />
                )}
              </ModalBackground>
            )}
          </>
        </>
      )}
    </>
  );
}

export default UserProfileTemplate;
