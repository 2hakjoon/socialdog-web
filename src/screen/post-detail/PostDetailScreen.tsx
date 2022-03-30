import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';

function PostDetailScreen() {
  const location = useLocation();
  const params = useParams();
  console.log(location, params);

  return (
    <>
      <MainHeader />
    </>
  );
}

export default PostDetailScreen;
