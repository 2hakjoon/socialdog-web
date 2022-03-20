import React, { useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'assets/styles/theme';
import SubscribingsTemplate from './templates/SubscribingsTemplate';
import AddressPostsTemplate from './templates/AddressPostsTemplate';
import dayjs from 'dayjs';

const SectionWrapper = styled.div``;

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
      <BaseWrapper>
        <WrapperRow bc={'white'} w="100%" h="60px" jc="space-around">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            color={tabIconColor(ADDRESS)}
            size="lg"
            onClick={() => setSelectedTab(ADDRESS)}
          />
          <FontAwesomeIcon
            icon={faUserGroup}
            color={tabIconColor(SUBSCRIBING)}
            size="lg"
            onClick={() => setSelectedTab(SUBSCRIBING)}
          />
        </WrapperRow>
        {selectedTab === ADDRESS && <AddressPostsTemplate />}
        {selectedTab === SUBSCRIBING && <SubscribingsTemplate />}
      </BaseWrapper>
    </>
  );
}

export default HomeScreen;
