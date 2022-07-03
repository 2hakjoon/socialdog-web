import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import NoContents from 'screen/common-comp/no-contents/NoContents';
import WrapperInfinityQueryScroll from 'screen/common-comp/wrappers/WrapperInfinityQueryScroll';
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

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface IMyPosts {
  username: string;
  itemsCount: number;
}

function MyPosts({ username, itemsCount }: IMyPosts) {
  const [itemLimit, setItemLimit] = useState<number>(itemsCount);
  const [isLastPage, setIsLastPage] = useState(false);

  // console.log(itemLimit);
  const userPosts = useQuery<QGetUserPosts, QGetUserPostsVariables>(GET_USER_POSTS, {
    variables: { username, page: { take: itemLimit } },
    notifyOnNetworkStatusChange: true,
  });
  const posts = userPosts.data?.getUserPosts.data;

  return (
    <>
      <WrapperInfinityQueryScroll
        query={userPosts}
        pageItemCount={itemsCount}
        setItemLimit={setItemLimit}
        itemLimit={itemLimit}
        isLastPage={isLastPage}
        setIsLastPage={setIsLastPage}
      >
        <PostsGrid>
          {posts?.map((post) => (
            <WrapperSquare key={post.id}>
              <ImgWrapper>
                <PostSmallBox {...post} />
              </ImgWrapper>
            </WrapperSquare>
          ))}
          {userPosts.loading &&
            Array(itemsCount)
              .fill('')
              .map(() => (
                <WrapperSquare key={Math.random()}>
                  <ImgWrapper>
                    <PostSmallBox photos="" __typename="Posts" id="" />
                  </ImgWrapper>
                </WrapperSquare>
              ))}
        </PostsGrid>
      </WrapperInfinityQueryScroll>
      {!userPosts.loading && !posts?.length && <NoContents />}
    </>
  );
}

export default MyPosts;
