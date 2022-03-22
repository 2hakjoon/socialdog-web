import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { CursorInput } from '__generated__/globalTypes';
import { QGetUserPosts, QGetUserPostsVariables } from '__generated__/QGetUserPosts';
import PostSmallBox from '../components/PostSmallBox';

const PostsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0px 4px;
`;

interface IMyPosts {
  username: string;
  itemsCount: number;
}

function MyPosts({ username, itemsCount }: IMyPosts) {
  const [isLastPage, setIsLastPage] = useState(false);
  const [postsLimit, setPostsLimit] = useState<number>(itemsCount);

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { take: postsLimit } },
    notifyOnNetworkStatusChange: true,
  });

  // console.log('postsData :', postsData, postsLoading);
  const posts = postsData?.getUserPosts.data;
  // console.log(posts);

  // 무한스크롤 handling함수
  const fetchNextPage = async () => {
    if (!postsError && posts?.length && !isLastPage && !postsLoading) {
      const lastPost = posts[posts.length - 1];
      const cursor: CursorInput = { id: lastPost.id, createdAt: lastPost.createdAt };
      const res = await fetchPostsMore({
        variables: {
          page: {
            take: itemsCount,
            cursor,
          },
        },
      });
      // console.log('fetched');
      if (res.data.getUserPosts.data.length !== itemsCount) {
        setIsLastPage(true);
      }
      setPostsLimit((prev) => prev + itemsCount);
    }
  };

  return (
    <WrapperInfinityScroll fetchHandler={fetchNextPage}>
      <PostsGrid>
        {posts?.map((post) => (
          <WrapperSquare key={post.id}>
            <BaseWrapper>
              <PostSmallBox {...post} />
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

export default MyPosts;
