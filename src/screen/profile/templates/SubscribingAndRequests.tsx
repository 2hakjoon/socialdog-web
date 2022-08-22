import React, { useState } from 'react';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'common/components/texts/TextBase';
import ModalRound from 'common/components/modal/ModalRound';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import UserCardThin from 'common/components/user-card/UserCardThin';
import { CANCEL_SUBSCRIBE_REQUEST, GET_MY_SUBSCRIBINGS_REQUESTS } from 'apllo-gqls/subscribes';
import { QGetMySubscribingsRequests } from '__generated__/QGetMySubscribingsRequests';
import { MCancelSubscribingRequest, MCancelSubscribingRequestVariables } from '__generated__/MCancelSubscribingRequest';
import ButtonSmallWhite from 'common/components/button/ButtonSmallWhite';
import useEvictCache from 'common/hooks/useEvictCache';
import UserCardThinLoading from 'common/components/user-card/UserCardThinLoading';

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

interface ISubscribingAndRequests {
  closeModal: () => void;
}

function SubscribingAndRequests({ closeModal }: ISubscribingAndRequests) {
  const { cache } = useApolloClient();
  const evictCache = useEvictCache();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [cancleSubscribingRequest] = useMutation<MCancelSubscribingRequest, MCancelSubscribingRequestVariables>(
    CANCEL_SUBSCRIBE_REQUEST,
  );
  const { data: mySubscribingsRequests, loading: mySubscribingsRequestsLoading } =
    useQuery<QGetMySubscribingsRequests>(GET_MY_SUBSCRIBINGS_REQUESTS);
  const subscribingUsers = mySubscribingsRequests?.getMySubscribings.data;
  const subscribingRequests = mySubscribingsRequests?.getSubscribingRequests.data;

  const cancleSubscribingRequestHandler = async (toId: string) => {
    const res = await cancleSubscribingRequest({ variables: { args: { to: toId } } });
    console.log(res);
    if (!res.data?.cancelSubscribingRequest.ok) {
      window.alert('res.data?.cancelSubscribingRequest.error');
      return;
    }
    const identifiedId = cache.identify({
      id: toId,
      __typename: 'UserProfile',
    });
    // console.log(identifiedId);
    cache.modify({
      fields: {
        getSubscribingRequests(existing: { data: [{ __ref: string }] }) {
          // console.log(existing);
          return { ...existing, data: existing.data.filter((data) => data.__ref !== identifiedId) };
        },
      },
    });
    evictCache(toId, 'UserProfile');
  };

  return (
    <ModalRound closeModal={closeModal} title="구독 및 신청">
      <WrapperRow jc="space-around">
        <TabBox selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
          <TextBase text={'구독 중'} />
        </TabBox>
        <TabBox selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
          <TextBase text={'구독 신청'} />
        </TabBox>
      </WrapperRow>
      <WrapperColumn>
        <>
          {selectedTab === 0 && (
            <>
              {subscribingUsers?.map((subscribingUser) => (
                <WrapperRow key={subscribingUser.id} w="100%" p={'0px 12px'}>
                  <UserCardThin key={subscribingUser.id} onClick={closeModal} {...subscribingUser} />
                </WrapperRow>
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {subscribingRequests?.map((subscribingRequest) => (
                <WrapperRow key={subscribingRequest.id} w="100%" p={'0px 12px'}>
                  <UserCardThin onClick={closeModal} {...subscribingRequest} />
                  <ButtonSmallWhite
                    title="취소"
                    onClick={() => cancleSubscribingRequestHandler(subscribingRequest.id)}
                  />
                </WrapperRow>
              ))}
            </>
          )}
          {mySubscribingsRequestsLoading && (
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

export default SubscribingAndRequests;
