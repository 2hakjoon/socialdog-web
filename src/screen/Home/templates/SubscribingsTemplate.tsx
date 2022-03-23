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

  const [isLastPage, setIsLastPage] = useState(false);
  const posts = postsData?.getSubscribingPosts.data;
  // console.log(postsData);
  // console.log(posts, postsLoading);

  const nextPageHandler = async () => {
    // 에러 없을때, 로딩중아닐때, 마지막페이지 아닐때, posts가 있을때, posts.length랑 pageLimit이 같을때
    if (postsError || postsLoading || isLastPage || !posts) {
      return;
    }

    // 캐시에 데이터가 있을때, pagelimit만 변경.
    if (postsData.getSubscribingPosts.length > pageLimit) {
      setPageLimit((prev) => prev + pageItemCount);
      return;
    }

    const lastPost = posts[posts.length - 1];
    const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
    fetchMore({
      variables: {
        page: {
          take: pageItemCount,
          cursor,
        },
      },
    }).then((data) => {
      if (data.data.getSubscribingPosts.length !== pageItemCount) {
        setPageLimit((prev) => prev + pageItemCount);
        setIsLastPage(true);
      }
    });
  };

  return (
    <WrapperColumn p={'0 8px'}>
      <WrapperInfinityScroll fetchHandler={() => nextPageHandler()}>
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
