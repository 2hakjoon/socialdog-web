import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import NoContents from 'screen/common-comp/no-contents/NoContents';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperInfinityScroll from 'screen/common-comp/wrappers/WrapperInfinityScroll';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import styled from 'styled-components';
import { CursorArgs } from '__generated__/globalTypes';
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
    fetchMore,
  } = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { take: postsLimit } },
    notifyOnNetworkStatusChange: true,
  });

  // console.log('postsData :', postsData, postsLoading);
  const posts = postsData?.getUserPosts.data;
  // console.log(posts);

  // 무한스크롤 handling함수
  const fetchNextPage = async () => {
    // 에러 없을때, 로딩중아닐때, 마지막페이지 아닐때, posts가 있을때, posts.length랑 pageLimit이 같을때
    if (postsError || postsLoading || isLastPage || !posts || !posts?.length) {
      return;
    }

    // 캐시에 데이터가 있을때, pagelimit만 변경.
    if (postsData.getUserPosts.length > postsLimit) {
      setPostsLimit((prev) => prev + itemsCount);
      return;
    }

    const lastPost = posts[posts.length - 1];
    const cursor: CursorArgs = { id: lastPost.id, createdAt: lastPost.createdAt };
    fetchMore({
      variables: {
        page: {
          take: itemsCount,
          cursor,
        },
      },
    }).then((data) => {
      if (data.data.getUserPosts.length !== itemsCount) {
        setPostsLimit((prev) => prev + itemsCount);
        setIsLastPage(true);
      }
    });
  };

  return (
    <>
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
      {!postsLoading && !posts?.length && <NoContents />}
    </>
  );
}

export default MyPosts;
