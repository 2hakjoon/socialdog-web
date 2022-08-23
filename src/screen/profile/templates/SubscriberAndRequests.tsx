import React, { useState } from 'react';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'common/components/texts/TextBase';
import ModalRound from 'common/components/modal/ModalRound';
import { makeReference, useApolloClient } from '@apollo/client';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import UserCardThin from 'common/components/user-card/UserCardThin';
import {
  QGetMySubscribersRequests_getMySubscribers,
  QGetMySubscribersRequests_getSubscribeRequests,
} from '__generated__/QGetMySubscribersRequests';
import { SubscribeRequestState } from '__generated__/globalTypes';
import ButtonSmallBlue from 'common/components/button/ButtonSmallBlue';
import ButtonSmallWhite from 'common/components/button/ButtonSmallWhite';
import useEvictCache from 'common/hooks/useEvictCache';
import UserCardThinLoading from 'common/components/user-card/UserCardThinLoading';
import useMyProfile from 'common/hooks/useMyProfile';
import useGetMySubscribersRequest from '../hooks/useGetMySubscribersRequest';
import useResponseSubscribe from '../hooks/useResponseSubscribe';

interface ITabBox {
  selected: boolean;
}

const TabBox = styled.div<ITabBox>`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border-bottom: 2px solid ${(p) => (p.selected ? p.theme.color.blue.primaryBlue : p.theme.color.achromatic.lightGray)};
`;

interface ISubscriberAndRequests {
  closeModal: () => void;
}

function SubscriberAndRequests({ closeModal }: ISubscriberAndRequests) {
  const { cache } = useApolloClient();
  const evitCache = useEvictCache();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { subscribers, subscribeRequests, mySubscriberRequestsLoading } = useGetMySubscribersRequest();
  const [responseSubscribe] = useResponseSubscribe();
  const { authUser } = useMyProfile();

  const onResponseSubscribe = async (fromUserId: string, subscribeRequest: SubscribeRequestState) => {
    const res = await responseSubscribe({ variables: { args: { from: fromUserId, subscribeRequest } } });
    console.log(res);
    if (!res.data?.responseSubscribe.ok) {
      window.alert(res.data?.responseSubscribe.error);
      return;
    }
    if (subscribeRequest === SubscribeRequestState.CONFIRMED) {
      cacheSubscribeConfirm(fromUserId);
    }
    if (subscribeRequest === SubscribeRequestState.REJECTED) {
      cacheSubscribeReject(fromUserId);
    }
    if (subscribeRequest === SubscribeRequestState.REQUESTED) {
      cacheSubscribePostPone(fromUserId);
    }
  };

  const cacheSubscribeConfirm = (fromUserId: string) => {
    const identifiedId = cache.identify({ id: fromUserId, __typename: 'UserProfile' });
    // console.log(identifiedId);
    cache.modify({
      id: cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getMySubscribers(existing: QGetMySubscribersRequests_getMySubscribers) {
          return { ...existing, data: [{ __ref: identifiedId }, ...existing.data] };
        },
        getSubscribeRequests(existing: QGetMySubscribersRequests_getSubscribeRequests) {
          return { ...existing, data: existing.data.filter((data: any) => data.__ref !== identifiedId) };
        },
      },
    });
    if (authUser) {
      evitCache(authUser?.id, 'UserProfile');
    }
  };

  const cacheSubscribeReject = (fromUserId: string) => {
    const identifiedId = cache.identify({ id: fromUserId, __typename: 'UserProfile' });
    // console.log(identifiedId);
    cache.modify({
      id: cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getSubscribeRequests(existing: { data: [{ __ref: string }] }) {
          return { ...existing, data: existing.data.filter((data: any) => data.__ref !== identifiedId) };
        },
        getMyRejectRequests(existing: { data: [{ __ref: string }] }) {
          if (!existing) {
            return undefined;
          }
          return { ...existing, data: [{ __ref: identifiedId }, ...existing.data] };
        },
      },
    });
    if (authUser) {
      evitCache(authUser?.id, 'UserProfile');
    }
  };

  const cacheSubscribePostPone = (fromUserId: string) => {
    const identifiedId = cache.identify({ id: fromUserId, __typename: 'UserProfile' });
    // console.log(identifiedId);
    cache.modify({
      id: cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getMySubscribers(existing: QGetMySubscribersRequests_getMySubscribers) {
          return { ...existing, data: existing.data.filter((data: any) => data.__ref !== identifiedId) };
        },
        getSubscribeRequests(existing: QGetMySubscribersRequests_getSubscribeRequests) {
          return { ...existing, data: [{ __ref: identifiedId }, ...existing.data] };
        },
      },
    });
  };

  return (
    <ModalRound closeModal={closeModal} title="구독자 및 신청">
      <WrapperRow jc="space-around">
        <TabBox selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
          <TextBase text={'구독자'} />
        </TabBox>
        <TabBox selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
          <TextBase text={'구독 신청'} />
        </TabBox>
      </WrapperRow>
      <WrapperColumn>
        <>
          {selectedTab === 0 && (
            <>
              {subscribers?.map((subscriber) => (
                <WrapperRow key={subscriber.id} w="100%" p={'0px 12px'}>
                  <UserCardThin onClick={closeModal} {...subscriber} />
                  <ButtonSmallBlue
                    title="보류"
                    onClick={() => onResponseSubscribe(subscriber.id, SubscribeRequestState.REQUESTED)}
                  />
                </WrapperRow>
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {subscribeRequests?.map((user) => (
                <WrapperRow key={user.id} w="100%" p={'0px 12px'}>
                  <UserCardThin onClick={closeModal} {...user} />
                  <ButtonSmallBlue
                    title="수락"
                    onClick={() => onResponseSubscribe(user.id, SubscribeRequestState.CONFIRMED)}
                  />

                  <ButtonSmallWhite
                    title="거절"
                    onClick={() => onResponseSubscribe(user.id, SubscribeRequestState.REJECTED)}
                  />
                </WrapperRow>
              ))}
            </>
          )}
          {mySubscriberRequestsLoading && (
            <>
              {Array(6)
                .fill('')
                .map((_) => (
                  <WrapperRow key={Math.random()} w={'100%'} p={'0px 12px'}>
                    <UserCardThinLoading />
                  </WrapperRow>
                ))}
            </>
          )}
        </>
      </WrapperColumn>
    </ModalRound>
  );
}

export default SubscriberAndRequests;
