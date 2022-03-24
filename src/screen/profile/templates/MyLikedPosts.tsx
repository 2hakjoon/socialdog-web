import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_LIKED_POSTS } from 'apllo-gqls/posts';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import PostSmallBox from '../components/PostSmallBox';
import { QGetMyLikedPosts, QGetMyLikedPostsVariables } from '__generated__/QGetMyLikedPosts';
import { CursorInput } from '__generated__/globalTypes';

const PostsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0px 4px;
`;

interface IMyLikedPosts {
  itemsCount: number;
}

function MyLikedPosts({ itemsCount }: IMyLikedPosts) {
  const [isLastPage, setIsLastPage] = useState(false);
  const [postsLimit, setPostsLimit] = useState<number>(itemsCount);

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore,
  } = useQuery<QGetMyLikedPosts, QGetMyLikedPostsVariables>(GET_MY_LIKED_POSTS, {
    variables: { page: { take: postsLimit } },
    notifyOnNetworkStatusChange: true,
  });

  // console.log('postsData :', postsData, postsLoading);
  const posts = postsData?.getMyLikedPosts.data;
  // console.log(posts);;

  // 무한스크롤 handling함수
  const fetchNextPage = async () => {
    // 에러 없을때, 로딩중아닐때, 마지막페이지 아닐때, posts가 있을때, posts.length랑 pageLimit이 같을때
    if (postsError || postsLoading || isLastPage || !posts || !posts?.length) {
      return;
    }

    // 캐시에 데이터가 있을때, pagelimit만 변경.
    if (postsData.getMyLikedPosts.length > postsLimit) {
      setPostsLimit((prev) => prev + itemsCount);
      return;
    }

    const lastPost = posts[posts.length - 1];
    const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
    fetchMore({
      variables: {
        page: {
          take: itemsCount,
          cursor,
        },
      },
    }).then((data) => {
      if (data.data.getMyLikedPosts.length !== itemsCount) {
        setPostsLimit((prev) => prev + itemsCount);
        setIsLastPage(true);
      }
    });
  };

  return (
    <WrapperInfinityScroll fetchHandler={fetchNextPage}>
      <PostsGrid>
        {posts?.map((post) => (
          <WrapperSquare key={post.id}>
            <BaseWrapper>
              <PostSmallBox __typename={post.__typename} id={post.id} photos={post.photos} />
            </BaseWrapper>
          </WrapperSquare>
        ))}
        {postsLoading &&
          Array(itemsCount)
            .fill('')
            .map(() => (
              <WrapperSquare key={Math.random()}>
                <BaseWrapper>
                  <PostSmallBox photos="" __typename="Posts" id="" />
                </BaseWrapper>
              </WrapperSquare>
            ))}
      </PostsGrid>
    </WrapperInfinityScroll>
  );
}

export default MyLikedPosts;
