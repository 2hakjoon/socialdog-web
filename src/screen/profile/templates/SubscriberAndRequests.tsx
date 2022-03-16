import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import { useMutation, useQuery } from '@apollo/client';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import { GET_MY_SUBSCRIBERS_REQUESTS, RESPONSE_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { QGetMySubscribersRequests } from '__generated__/QGetMySubscribersRequests';
import { MResponseSubscribe, MResponseSubscribeVariables } from '__generated__/MResponseSubscribe';
import { SubscribeRequestState } from '__generated__/globalTypes';

interface ITabBox {
  selected: boolean;
}

const TabBox = styled.div<ITabBox>`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
  border-bottom: 2px solid ${(p) => (p.selected ? p.theme.color.blue.primaryBlue : p.theme.color.achromatic.lightGray)};
`;

interface ISubscriberAndRequests {
  closeModal: () => void;
}

function SubscriberAndRequests({ closeModal }: ISubscriberAndRequests) {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { data: mySubscriberRequests } = useQuery<QGetMySubscribersRequests>(GET_MY_SUBSCRIBERS_REQUESTS);
  const [responseSubscribe] = useMutation<MResponseSubscribe, MResponseSubscribeVariables>(RESPONSE_SUBSCRIBE);
  const subscribers = mySubscriberRequests?.getMySubscribers.data;
  const subscribeRequests = mySubscriberRequests?.getSubscribeRequests.data;

  const onResponseSubscribe = async (fromUserId: string, subscribeRequest: SubscribeRequestState) => {
    const res = await responseSubscribe({ variables: { args: { from: fromUserId, subscribeRequest } } });
    console.log(res);
  };

  return (
    <ModalRound closeModal={closeModal} title="삼촌-이모 및 신청">
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
                <WrapperRow w="100%">
                  <UserCardThin onClick={closeModal} {...subscriber} />
                  <button
                    type="button"
                    onClick={() => onResponseSubscribe(subscriber.id, SubscribeRequestState.REQUESTED)}
                  >
                    구독보류
                  </button>
                </WrapperRow>
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {subscribeRequests?.map((user) => (
                <WrapperRow>
                  <UserCardThin onClick={closeModal} {...user} />
                  <button type="button" onClick={() => onResponseSubscribe(user.id, SubscribeRequestState.CONFIRMED)}>
                    수락하기
                  </button>
                  <button type="button" onClick={() => onResponseSubscribe(user.id, SubscribeRequestState.REJECTED)}>
                    거절하기
                  </button>
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
