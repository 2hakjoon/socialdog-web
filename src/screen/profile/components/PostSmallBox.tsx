import React from 'react';
import ImageBase from 'screen/common-comp/image/ImageBase';
import styled from 'styled-components';
import { QGetUserPosts_getUserPosts_data } from '__generated__/QGetUserPosts';

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.achromatic.lightGray};
`;

function PostSmallBox({ photos }: QGetUserPosts_getUserPosts_data) {
  if (!photos) {
    return <LoadingBox />;
  }
  const thumbnail = JSON.parse(photos)[0];
  // console.log(thumbnail);
  return <ImageBase url={thumbnail} />;
}

export default PostSmallBox;
