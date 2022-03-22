import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { GET_SUBSCRIBING_POSTS } from 'apllo-gqls/posts';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import { QGetSubscribingPosts } from '__generated__/QGetSubscribingPosts';
import PostCard from '../components/PostCard';
import PostCardLoading from '../components/PostCardLoading';
import { CursorInput } from '__generated__/globalTypes';

function SubscribingsTemplate() {
  const pageItemCount = 6;
  const [isLastPage, setIsLatsPage] = useState(false);
  const [pageLimit, setPageLimit] = useState(pageItemCount);
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore,
  } = useQuery<QGetSubscribingPosts>(GET_SUBSCRIBING_POSTS, {
    variables: {
      page: {
        take: pageLimit,
      },
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    onError: (e) => console.log(e),
  });
  const posts = postsData?.getSubscribingPosts.data;
  // console.log(posts, postsLoading, 'isLastPage : ', isLastPage);

  const nextPageHandler = async () => {
    // 에러없고, 길이가 0도아니고, 로딩중도아니고, 마지막 페이지가 아닐때
    if (!postsError && posts?.length && !postsLoading && !isLastPage) {
      const lastPost = posts[posts.length - 1];
      const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
      const res = await fetchMore({
        variables: {
          page: {
            take: pageItemCount,
            cursor,
          },
        },
      });
      if (res.data.getSubscribingPosts.data.length !== pageItemCount) {
        setIsLatsPage(true);
      }
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
