import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { GET_SUBSCRIBING_POSTS } from 'apllo-gqls/posts';
import { QGetSubscribingPosts } from '__generated__/QGetSubscribingPosts';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';
import NoContents from 'screen/common-comp/no-contents/NoContents';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';

function SubscribingsTemplate() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const getSubscribingPosts = useQuery<QGetSubscribingPosts>(GET_SUBSCRIBING_POSTS, {
    variables: {
      page: {
        take: itemLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    onError: (e) => console.log(e),
  });

  const posts = getSubscribingPosts.data?.getSubscribingPosts.data;

  return (
    <WrapperColumn p={'0 8px'}>
      <WrapperInfinityQueryScroll
        query={getSubscribingPosts}
        pageItemCount={pageItemCount}
        setItemLimit={setItemLimit}
        itemLimit={itemLimit}
      >
        {posts?.map((post, idx) => (
          <PostCard key={post.id} {...post} />
        ))}
        {getSubscribingPosts.loading &&
          Array(pageItemCount)
            .fill('')
            .map(() => <PostCardLoading key={Math.random()} />)}
      </WrapperInfinityQueryScroll>
      {!getSubscribingPosts.loading && !posts?.length && <NoContents />}
    </WrapperColumn>
  );
}

export default SubscribingsTemplate;
