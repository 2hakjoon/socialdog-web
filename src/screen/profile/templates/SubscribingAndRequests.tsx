import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import { CANCEL_SUBSCRIBE_REQUEST, GET_MY_SUBSCRIBINGS_REQUESTS } from 'apllo-gqls/subscribes';
import { QGetMySubscribingsRequests } from '__generated__/QGetMySubscribingsRequests';
import { MCancelSubscribingRequest, MCancelSubscribingRequestVariables } from '__generated__/MCancelSubscribingRequest';
import ButtonSmallWhite from 'screen/common-comp/button/ButtonSmallWhite';

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

interface ISubscribingAndRequests {
  closeModal: () => void;
}

function SubscribingAndRequests({ closeModal }: ISubscribingAndRequests) {
  const { cache } = useApolloClient();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [cancleSubscribingRequest] = useMutation<MCancelSubscribingRequest, MCancelSubscribingRequestVariables>(
    CANCEL_SUBSCRIBE_REQUEST,
  );
  const { data: mySubscribingsRequests } = useQuery<QGetMySubscribingsRequests>(GET_MY_SUBSCRIBINGS_REQUESTS);
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
                <UserCardThin onClick={closeModal} {...subscribingUser} />
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {subscribingRequests?.map((subscribingRequest) => (
                <WrapperRow w="100%">
                  <UserCardThin onClick={closeModal} {...subscribingRequest} />
                  <ButtonSmallWhite
                    title="취소"
                    onClick={() => cancleSubscribingRequestHandler(subscribingRequest.id)}
                  />
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
