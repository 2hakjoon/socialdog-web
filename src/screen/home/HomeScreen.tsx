import React, { useState } from 'react';
import MainHeader from 'common/components/header/MainHeader';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import { theme } from 'assets/styles/theme';
import AddressPostsTemplate from './templates/AddressPostsTemplate';
import SubscribingsTemplate from './templates/SubscribingsTemplate';
import TextBase, { Text } from 'common/components/texts/TextBase';
import styled from 'styled-components';
import MainFooter from 'common/components/footer/MainFooter';

const ADDRESS = 'ADDRESS';
const SUBSCRIBING = 'SUBSCRIBING';

interface BorderWrapperProps {
  color?: string;
  onClick: () => void;
}

const BorderWrapper = styled.div<BorderWrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: ${(p) => p.color} 4px solid;
`;

function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'ADDRESS' | 'SUBSCRIBING'>(ADDRESS);
  const tabIconColor = (tabName: string) => {
    if (selectedTab === tabName) {
      return theme.color.blue.primaryBlue;
    }
    return theme.color.achromatic.darkGray;
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper p={''}>
        <WrapperRow bc={'white'} w="100%" h="60px" jc="space-around">
          <BorderWrapper color={tabIconColor(ADDRESS)} onClick={() => setSelectedTab(ADDRESS)}>
            <TextBase text={'장소별'} fontSize={'1.125rem'} fontWeight={500} color={tabIconColor(ADDRESS)} />
          </BorderWrapper>
          <BorderWrapper color={tabIconColor(SUBSCRIBING)} onClick={() => setSelectedTab(SUBSCRIBING)}>
            <TextBase text={'구독중'} fontSize={'1.125rem'} fontWeight={500} color={tabIconColor(SUBSCRIBING)} />
          </BorderWrapper>
        </WrapperRow>
        {selectedTab === ADDRESS && <AddressPostsTemplate />}
        {selectedTab === SUBSCRIBING && <SubscribingsTemplate />}
      </BaseWrapper>
      <MainFooter />
    </>
  );
}

export default HomeScreen;
