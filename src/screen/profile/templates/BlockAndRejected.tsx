import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import { useMutation, useQuery } from '@apollo/client';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import { GET_BLOCK_REJECTED, RESPONSE_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { QGetMyBlockAndReject } from '__generated__/QGetMyBlockAndReject';
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

interface IBlockAndRejected {
  closeModal: () => void;
}

function BlockAndRejected({ closeModal }: IBlockAndRejected) {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { data: blockAndRejectedData } = useQuery<QGetMyBlockAndReject>(GET_BLOCK_REJECTED);
  const blockingUsers = blockAndRejectedData?.getMyBlockingUsers.data;
  const rejectedUsers = blockAndRejectedData?.getMyRejectRequests.data;
  const [responseSubscribe] = useMutation<MResponseSubscribe, MResponseSubscribeVariables>(RESPONSE_SUBSCRIBE);

  const onConfirmRequest = async (fromId: string) => {
    const res = await responseSubscribe({
      variables: { args: { from: fromId, subscribeRequest: SubscribeRequestState.CONFIRMED } },
    });
    console.log(res);
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
                  <button type="button" onClick={() => onConfirmRequest(rejectedUser.id)}>
                    수락
                  </button>
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
