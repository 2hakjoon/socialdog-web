import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';
import { useQuery } from '@apollo/client';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import { GET_MY_SUBSCRIBINGS_REQUESTS } from 'apllo-gqls/subscribes';
import { QGetMySubscribingsRequests } from '__generated__/QGetMySubscribingsRequests';

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
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { data: mySubscribingsRequests } = useQuery<QGetMySubscribingsRequests>(GET_MY_SUBSCRIBINGS_REQUESTS);
  const subscribingUsers = mySubscribingsRequests?.getMySubscribings.data;
  const subscribingRequests = mySubscribingsRequests?.getSubscribingRequests.data;

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
                <UserCardThin
                  onClick={closeModal}
                  username={subscribingUser.username}
                  dogname={subscribingUser.dogname}
                  photo={subscribingUser.photo}
                />
              ))}
            </>
          )}
          {selectedTab === 1 && (
            <>
              {subscribingRequests?.map((subscribingRequest) => (
                <UserCardThin
                  onClick={closeModal}
                  username={subscribingRequest.username}
                  dogname={subscribingRequest.dogname}
                  photo={subscribingRequest.photo}
                />
              ))}
            </>
          )}
        </>
      </WrapperColumn>
    </ModalRound>
  );
}

export default SubscribingAndRequests;
