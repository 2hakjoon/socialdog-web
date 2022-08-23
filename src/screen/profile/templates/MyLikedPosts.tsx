import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_LIKED_POSTS } from 'apllo-gqls/posts';
import WrapperSquare from 'common/components/wrappers/WrapperSquare';
import styled from 'styled-components';
import PostSmallBox from '../components/PostSmallBox';
import { QGetMyLikedPosts, QGetMyLikedPostsVariables } from '__generated__/QGetMyLikedPosts';
import NoContents from 'common/components/no-contents/NoContents';
import WrapperInfinityQueryScroll from 'common/components/wrappers/WrapperInfinityQueryScroll';
import useMyLikedPosts from '../hooks/useMyLikedPosts';

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

interface IMyLikedPosts {
  itemsCount: number;
}

function MyLikedPosts({ itemsCount }: IMyLikedPosts) {
  const [itemLimit, setItemLimit] = useState<number>(itemsCount);
  const [isLastPage, setIsLastPage] = useState(false);

  const myLikedPosts = useMyLikedPosts({ itemLimit });
  const posts = myLikedPosts.data?.getMyLikedPosts.data;

  return (
    <>
      <WrapperInfinityQueryScroll
        query={myLikedPosts}
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
                <PostSmallBox __typename={post.__typename} id={post.id} photos={post.photos} />
              </ImgWrapper>
            </WrapperSquare>
          ))}
          {myLikedPosts.loading &&
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
      {!myLikedPosts.loading && !posts?.length && <NoContents />}
    </>
  );
}

export default MyLikedPosts;
