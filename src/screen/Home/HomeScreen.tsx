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

const SectionWrapper = styled.div``;

function HomeScreen() {
  const pageItemCount = 2;
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

  const nextPageHandler = () => {
    if (!postsError) {
      setPageLimit((prev) => prev + pageItemCount);
    }
  };

  return (
    <>
      {postsLoading ? (
        <span>Loading</span>
      ) : (
        <>
          <MainHeader />
          <BaseWrapper>
            <SectionWrapper>
              <WrapperInfinityScroll fetchHandler={nextPageHandler} enableFetch={!postsLoading}>
                <WrapperColumn p="0 8px">
                  {posts?.map((post, idx) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </WrapperColumn>
              </WrapperInfinityScroll>
              {/* <div>옆에 올 컨텐츠</div> */}
            </SectionWrapper>
          </BaseWrapper>
        </>
      )}
    </>
  );
}

export default HomeScreen;
