import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import PostCard from './components/PostCard';
import { QGetSubscribingPosts } from '../../__generated__/QGetSubscribingPosts';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { GET_SUBSCRIBING_POSTS } from 'apllo-gqls/posts';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import PostCardLoading from './components/PostCardLoading';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'assets/styles/theme';
import AddressSelector from './components/AddressSelector';
import { IPlaceSerchResult, IPlaceTerms } from 'types/GooglePlace';

const SectionWrapper = styled.div``;

const ADDRESS = 'ADDRESS';
const SUBSCRIBING = 'SUBSCRIBING';

const mockupAddress = [
  { offset: 23, value: '눈보뛰' },
  { offset: 19, value: '대산로' },
  { offset: 15, value: '삼도동' },
  { offset: 11, value: '광산구' },
  { offset: 5, value: '광주광역시' },
  { offset: 0, value: '대한민국' },
];

function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'ADDRESS' | 'SUBSCRIBING'>(SUBSCRIBING);
  const [searchAddress, setSearchAddress] = useState<IPlaceTerms | null | undefined>(mockupAddress);
  const pageItemCount = 6;
  const [pageLimit, setPageLimit] = useState(pageItemCount);
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore,
  } = useQuery<QGetSubscribingPosts>(GET_SUBSCRIBING_POSTS, {
    variables: {
      page: {
        offset: 0,
        limit: pageLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
    onError: (e) => console.log(e),
  });
  const posts = postsData?.getSubscribingPosts.data;
  console.log(posts, postsLoading);

  useEffect(() => {
    // console.log(posts?.length, pageLimit);
    if (posts && pageLimit > pageItemCount) {
      if (posts.length + pageItemCount === pageLimit) {
        fetchMore({
          variables: {
            page: {
              offset: posts.length,
              limit: pageItemCount,
            },
          },
        });
      }
    }
  }, [posts]);

  useEffect(() => {
    console.log(searchAddress);
  }, [searchAddress]);

  const nextPageHandler = () => {
    if (!postsError) {
      setPageLimit((prev) => prev + pageItemCount);
    }
  };

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
        {selectedTab === ADDRESS && <AddressSelector address={searchAddress} setAddress={setSearchAddress} />}
        <SectionWrapper>
          <WrapperColumn p="0 8px">
            <WrapperInfinityScroll fetchHandler={nextPageHandler} enableFetch={!postsLoading}>
              {posts?.map((post, idx) => (
                <PostCard key={post.id} {...post} />
              ))}
              {postsLoading &&
                Array(pageItemCount)
                  .fill('')
                  .map(() => <PostCardLoading />)}
            </WrapperInfinityScroll>
          </WrapperColumn>
          {/* <div>옆에 올 컨텐츠</div> */}
        </SectionWrapper>
      </BaseWrapper>
    </>
  );
}

export default HomeScreen;
