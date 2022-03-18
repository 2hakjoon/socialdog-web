import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { GET_SUBSCRIBING_POSTS } from 'apllo-gqls/posts';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { QGetSubscribingPosts } from '__generated__/QGetSubscribingPosts';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';

function SubscribingsTemplate() {
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
  //  console.log(posts, postsLoading);

  const nextPageHandler = async () => {
    if (postsError || !posts) {
      return null;
    }
    // console.log('fetched', posts.length, pageLimit);
    if (posts.length === pageLimit) {
      fetchMore({
        variables: {
          page: {
            offset: posts.length,
            limit: pageItemCount,
          },
        },
      });
      setPageLimit((prev) => prev + pageItemCount);
    }
  };

  return (
    <WrapperColumn p={'0 8px'}>
      <WrapperInfinityScroll fetchHandler={nextPageHandler}>
        {posts?.map((post, idx) => (
          <PostCard key={post.id} {...post} />
        ))}
        {postsLoading &&
          Array(pageItemCount)
            .fill('')
            .map(() => <PostCardLoading key={Math.random()} />)}
      </WrapperInfinityScroll>
    </WrapperColumn>
  );
}

export default SubscribingsTemplate;
