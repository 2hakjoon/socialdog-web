import React from 'react';
import SkeletonBox from 'screen/common-comp/skeleton/SkeletonBox';
import SkeletonCircle from 'screen/common-comp/skeleton/SkeletonCircle';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';

function UserProfileLoading() {
  return (
    <>
      <WrapperRow w="100%" jc="space-around" p={'20px 20px 30px 20px'} bc={'white'}>
        <WrapperColumn h="140px" jc="space-around">
          <SkeletonCircle size="90px" />
          <WrapperRow>
            <SkeletonBox height="20px" width="50px" margin="0 6px" />
            <SkeletonCircle size="20px" />
          </WrapperRow>
        </WrapperColumn>
        <WrapperColumn jc="space-around">
          <WrapperRow>
            <SkeletonBox height="30px" width="50px" margin="0px 16px" />
            <SkeletonBox height="30px" width="50px" />
          </WrapperRow>
        </WrapperColumn>
      </WrapperRow>
    </>
  );
}

export default UserProfileLoading;
