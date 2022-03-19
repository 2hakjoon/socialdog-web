import React from 'react';
import ImageBase from 'screen/common-comp/image/ImageBase';
import styled from 'styled-components';

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.achromatic.lightGray};
`;

export interface IPostSmallBox {
  __typename: string;
  photos: string;
  id: string;
}
function PostSmallBox({ photos, __typename, id }: IPostSmallBox) {
  // console.log(photos);
  if (!photos) {
    return <LoadingBox />;
  }
  const thumbnail = JSON.parse(photos)[0];
  // console.log(thumbnail);
  return <ImageBase url={thumbnail} />;
}

export default PostSmallBox;
