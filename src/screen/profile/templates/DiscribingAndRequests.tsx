import React from 'react';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import { useState } from 'react';
import ModalRound from 'screen/common-comp/modal/ModalRound';

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

interface IDiscribingAndRequests {
  closeModal: () => void;
}

function DiscribingAndRequests({ closeModal }: IDiscribingAndRequests) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <ModalRound closeModal={closeModal}>
      <WrapperRow jc="space-around">
        <TabBox selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
          <TextBase text={'1번'} />
        </TabBox>
        <TabBox selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
          <TextBase text={'2번'} />
        </TabBox>
      </WrapperRow>
    </ModalRound>
  );
}

export default DiscribingAndRequests;
