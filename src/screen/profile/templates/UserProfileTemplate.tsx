import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CANCEL_SUBSCRIBE, CHANGE_BLOCKSTATE, REQUEST_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { MYPROFILE } from 'apllo-gqls/users';
import useEvictCache from 'hooks/useEvictCache';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import ButtonSmallWhite from 'screen/common-comp/button/ButtonSmallWhite';
import DropdownEllipsis from 'screen/common-comp/dropdown/DropdownEllipsis';
import ProfilePhoto from 'screen/common-comp/image/ProfilePhoto';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import ReportModal from 'screen/common-comp/report/ReportModal';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperButton from 'screen/common-comp/wrappers/WrapperButton';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { BLOCKANDREJECT, REPORT_USER, SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import { BlockState, SubscribeRequestState } from '__generated__/globalTypes';
import { McancelSubscribing, McancelSubscribingVariables } from '__generated__/McancelSubscribing';
import { MChangeBlockState, MChangeBlockStateVariables } from '__generated__/MChangeBlockState';
import { MRequestSubscribe, MRequestSubscribeVariables } from '__generated__/MRequestSubscribe';
import { QGetUserProfile } from '__generated__/QGetUserProfile';
import { QMe } from '__generated__/QMe';
import { Params } from '../ProfileScreen';
import BlockAndRejected from './BlockAndRejected';
import SubscriberAndRequests from './SubscriberAndRequests';
import SubscribingAndRequests from './SubscribingAndRequests';

interface IUserProfileTemplate {
  userData: QGetUserProfile;
}

function UserProfileTemplate({ userData }: IUserProfileTemplate) {
  const user = userData.getUserProfile.data;
  const userProfileState = userData.getUserProfile;
  const { username } = useParams<Params>();
  const evictCache = useEvictCache();
  const navigate = useNavigate();
  const { cache } = useApolloClient();
  const { data: authUserData } = useQuery<QMe>(MYPROFILE);
  const authUser = authUserData?.me.data;
  const [requestSubscribe] = useMutation<MRequestSubscribe, MRequestSubscribeVariables>(REQUEST_SUBSCRIBE);
  const [cancelSubscribing] = useMutation<McancelSubscribing, McancelSubscribingVariables>(CANCEL_SUBSCRIBE);
  const [changeBlockState] = useMutation<MChangeBlockState, MChangeBlockStateVariables>(CHANGE_BLOCKSTATE);
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
                <TextBase text={user.username} p="0 6px" />
                {isMyProfile() && (
                  <Link to={routes.profileEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" />
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
                >
                  <TextBase text={'구독중'} />
                  <TextBase text={user.subscribings || 0} />
                </WrapperButton>
                <WrapperButton
                  fd="column"
                  h="50px"
                  jc="space-around"
                  onClick={isMyProfile() ? openSubscriberModal : () => {}}
                >
                  <TextBase text={'구독자'} />
                  <TextBase text={user.subscribers || 0} />
                </WrapperButton>
              </WrapperRow>
              {isMyProfile() ? (
                <ButtonSmallBlue title={'차단-거절 관리'} onClick={() => openBlockAndRejected()} />
              ) : (
                <WrapperRow w="100%" jc="space-between" p="16px 0 0 0">
                  {isSubscribeConfrimed() && (
                    <ButtonSmallWhite title="구독취소" onClick={() => oncancelSubscribing(user.id)} />
                  )}
                  {isSubscribeReqested() && <TextBase text={'구독 신청 보냄'} />}
                  {isNotSubscribeReqested() && (
                    <ButtonSmallBlue title="구독신청" onClick={() => onRequestSubscribe(user.id)} />
                  )}
                  {isBlokingPerson() ? (
                    <ButtonSmallBlue title="차단해제" onClick={() => changeUserBlock(username, false)} />
                  ) : (
                    <ButtonSmallWhite title="차단" onClick={() => changeUserBlock(username, true)} />
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
