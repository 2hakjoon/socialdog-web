import React from 'react';
import ImageBase from 'screen/common-comp/Image/ImageBase';
import { QGetMyPosts_getMyPosts_data } from '__generated__/QGetMyPosts';

function PostSmallBox({ photos }: QGetMyPosts_getMyPosts_data) {
  const thumbnail = JSON.parse(photos)[0];
  // console.log(thumbnail);
  return <ImageBase url={thumbnail} />;
}

export default PostSmallBox;
