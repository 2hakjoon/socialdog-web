import React from 'react';
import ImageBase from 'screen/common-comp/image/ImageBase';
import { QGetUserPosts_getUserPosts_data } from '__generated__/QGetUserPosts';

function PostSmallBox({ photos }: QGetUserPosts_getUserPosts_data) {
  const thumbnail = JSON.parse(photos)[0];
  // console.log(thumbnail);
  return <ImageBase url={thumbnail} />;
}

export default PostSmallBox;
