import { gql, makeReference, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';
import NoContents from 'common/components/no-contents/NoContents';
import WrapperInfinityQueryScroll from 'common/components/wrappers/WrapperInfinityQueryScroll';
import RefreshButton from '../components/RefreshButton';
import useGetSubscribingPosts from '../hooks/useGetSubscribingPosts';

function SubscribingsTemplate() {
  const pageItemCount = 6;
  const [itemLimit, setItemLimit] = useState(pageItemCount);
  const [isLastPage, setIsLastPage] = useState(false);
  const client = useApolloClient();
  const getSubscribingPosts = useGetSubscribingPosts({ itemLimit });

  const posts = getSubscribingPosts.data?.getSubscribingPosts.data;

  const removeSubscribingPosts = () => {
    client.cache.modify({
      id: client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getSubscribingPosts() {
          return undefined;
        },
      },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLastPage(false);
  };

  return (
    <WrapperColumn p={'0 8px'}>
      <RefreshButton onClick={removeSubscribingPosts} />
      <WrapperInfinityQueryScroll
        query={getSubscribingPosts}
        pageItemCount={pageItemCount}
        setItemLimit={setItemLimit}
        itemLimit={itemLimit}
        isLastPage={isLastPage}
        setIsLastPage={setIsLastPage}
      >
        {posts?.map((post, idx) => (
          <PostCard key={post.id} {...post} />
        ))}
        {getSubscribingPosts.loading &&
          Array(pageItemCount)
            .fill('')
            .map(() => <PostCardLoading key={Math.random()} />)}
      </WrapperInfinityQueryScroll>
      {!getSubscribingPosts.loading && !posts?.length && (
        <NoContents text={`아직 구독중인 계정이 없거나, \n 작성된 게시물이 없어요.`} />
      )}
    </WrapperColumn>
  );
}

export default SubscribingsTemplate;
