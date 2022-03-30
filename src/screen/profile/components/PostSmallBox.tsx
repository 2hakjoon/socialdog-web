import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageBase from 'screen/common-comp/image/ImageBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { routes } from 'screen/routes';
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
  const navigate = useNavigate();
  const moveToPostDetail = () => {
    navigate(`${routes.postDetailBase}${id}`);
  };

  const thumbnail = JSON.parse(photos)[0];
  // console.log(thumbnail);
  return (
    <WrapperRow onClick={moveToPostDetail}>
      <ImageBase url={thumbnail} />
    </WrapperRow>
  );
}

export default PostSmallBox;
