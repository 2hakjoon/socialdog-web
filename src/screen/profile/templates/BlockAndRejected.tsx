import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import { makeReference, useApolloClient, useMutation, useQuery } from '@apollo/client';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import { GET_BLOCK_REJECTED, RESPONSE_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { QGetMyBlockAndReject } from '__generated__/QGetMyBlockAndReject';
import { MResponseSubscribe, MResponseSubscribeVariables } from '__generated__/MResponseSubscribe';
import { SubscribeRequestState } from '__generated__/globalTypes';
import ButtonSmallBlue from 'screen/common-comp/button/ButtonSmallBlue';
import { QMe } from '__generated__/QMe';
import { MYPROFILE } from 'apllo-gqls/users';

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

interface IBlockAndRejected {
  closeModal: () => void;
}

function BlockAndRejected({ closeModal }: IBlockAndRejected) {
  const { cache } = useApolloClient();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { data: blockAndRejectedData } = useQuery<QGetMyBlockAndReject>(GET_BLOCK_REJECTED);
  const blockingUsers = blockAndRejectedData?.getMyBlockingUsers.data;
  const rejectedUsers = blockAndRejectedData?.getMyRejectRequests.data;
  const [responseSubscribe] = useMutation<MResponseSubscribe, MResponseSubscribeVariables>(RESPONSE_SUBSCRIBE);
  const { data: authUserData } = useQuery<QMe>(MYPROFILE);
  const authUser = authUserData?.me.data;

  const onConfirmRequest = async (fromId: string) => {
    const res = await responseSubscribe({
      variables: { args: { from: fromId, subscribeRequest: SubscribeRequestState.CONFIRMED } },
    });
    console.log(res);

    const identifiedId = cache.identify({
      id: fromId,
      __typename: 'UserProfile',
    });
    cache.modify({
      id: cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getMyRejectRequests(existing: { data: [{ __ref: string }] }) {
          return { ...existing, data: existing.data.filter((data: any) => data.__ref !== identifiedId) };
        },
        getMySubscribers(existing: { data: [{ __ref: string }] }) {
          if (!existing) {
            return undefined;
          }
          return { ...existing, data: [{ __ref: identifiedId }, ...existing.data] };
        },
      },
    });
    const identifiedAuhUser = cache.identify({
      id: authUser?.id,
      __typename: 'UserProfileAll',
    });

    if (identifiedAuhUser) {
      cache.evict({ id: identifiedAuhUser });
      cache.gc();
    }
  };

  return (
    <ModalRound closeModal={closeModal} title="거절 및 차단">
      <WrapperRow jc="space-around">
        <TabBox selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
          <TextBase text={'구독 거절'} />
        </TabBox>
        <TabBox selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
          <TextBase text={'차단'} />
        </TabBox>
      </WrapperRow>
      <WrapperColumn>
        <>
          {selectedTab === 0 && (
            <>
              {rejectedUsers?.map((rejectedUser) => (
                <WrapperRow w="100%">
                  <UserCardThin onClick={closeModal} {...rejectedUser} />
                  <ButtonSmallBlue title="수락" onClick={() => onConfirmRequest(rejectedUser.id)} />
                </WrapperRow>
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {blockingUsers?.map((blockingUser) => (
                <>
                  <UserCardThin onClick={closeModal} {...blockingUser} />
                </>
              ))}
            </>
          )}
        </>
      </WrapperColumn>
    </ModalRound>
  );
}

export default BlockAndRejected;
