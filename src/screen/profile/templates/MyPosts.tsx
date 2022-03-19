import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
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
  const [postsLimit, setPostsLimit] = useState<number>(itemsCount);

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { offset: 0, limit: postsLimit } },
    notifyOnNetworkStatusChange: true,
  });

  // console.log('postsData :', postsData, postsLoading);
  const posts = postsData?.getUserPosts.data;
  // console.log(posts);

  // 다음페이지 데이터 요청
  useEffect(() => {
    // console.log('useEffect', posts?.length, itemsCount, postsLimit);
    if (posts && postsLimit > itemsCount) {
      if (posts.length + itemsCount === postsLimit) {
        fetchPostsMore({
          variables: {
            username,
            page: { offset: posts?.length || 0, limit: itemsCount },
          },
        });
        console.log('fetched');
      }
    }
  }, [posts]);

  // 무한스크롤 handling함수
  const fetchNextPage = () => {
    if (!postsError) {
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
