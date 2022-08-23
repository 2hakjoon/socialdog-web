import React from 'react';
import SkeletonBox from 'common/components/skeleton/SkeletonBox';
import SkeletonCircle from 'common/components/skeleton/SkeletonCircle';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperRow from 'common/components/wrappers/WrapperRow';

function CommentCardLoading() {
  return (
    <WrapperRow w="100%" p="8px 4px">
      <SkeletonCircle size="40px" />
      <WrapperColumn w="100%" ai="flex-start" p="0px 8px">
        <SkeletonBox width="100px" height="18px" margin="8px 0px" />
        <SkeletonBox width="200px" height="18px" />
      </WrapperColumn>
    </WrapperRow>
  );
}
export default CommentCardLoading;
