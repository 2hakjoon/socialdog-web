import React, { useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'assets/styles/theme';
import AddressPostsTemplate from './templates/AddressPostsTemplate';
import SubscribingsTemplate from './templates/SubscribingsTemplate';
import TextBase, { Text } from 'screen/common-comp/texts/TextBase';

const ADDRESS = 'ADDRESS';
const SUBSCRIBING = 'SUBSCRIBING';

function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'ADDRESS' | 'SUBSCRIBING'>(SUBSCRIBING);
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
          <WrapperRow onClick={() => setSelectedTab(ADDRESS)}>
            <TextBase text={'지역별'} color={tabIconColor(ADDRESS)} />
          </WrapperRow>
          <WrapperRow onClick={() => setSelectedTab(SUBSCRIBING)}>
            <TextBase text={'구독중'} color={tabIconColor(SUBSCRIBING)} />
          </WrapperRow>
        </WrapperRow>
        {selectedTab === ADDRESS && <AddressPostsTemplate />}
        {selectedTab === SUBSCRIBING && <SubscribingsTemplate />}
      </BaseWrapper>
    </>
  );
}

export default HomeScreen;
