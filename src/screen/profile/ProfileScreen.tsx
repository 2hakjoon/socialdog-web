import React, { Fragment, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';
import { QMe } from '__generated__/QMe';
import { BlockState } from '__generated__/globalTypes';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { theme } from 'assets/styles/theme';
import MyPosts from './templates/MyPosts';
import MyLikedPosts from './templates/MyLikedPosts';
import UserProfileTemplate from './templates/UserProfileTemplate';
import UserProfileLoading from './templates/UserProfileLoading';
import { useEffect } from 'react';

export type Params = {
  username: string;
};

type PostType = 'MY' | 'LIKED';

function ProfileScreen() {
  const [postsType, setPostType] = useState<PostType>('MY');
  const { username } = useParams<Params>();
  if (!username) {
    return <></>;
  }
  const { data: authUserData } = useQuery<QMe>(MYPROFILE);
  const authUser = authUserData?.me.data;

  const { data: userData, loading: userDataLoading } = useQuery<QGetUserProfile, QGetUserProfileVariables>(
    GET_USER_PROFILE,
    {
      variables: { args: { username } },
    },
  );
  const user = userData?.getUserProfile.data;
  const userProfileState = userData?.getUserProfile;
  // console.log('user', user, userProfileState);

  const isMyProfile = () => {
    return authUser?.id === user?.id;
  };

  const isBlokingPerson = () => {
    return userProfileState?.blocking === BlockState.BLOCKING;
  };

  const isProfileOpened = () => {
    if (username === authUser?.username) {
      return true;
    }
    // 프로필이 open이 false이지만, 구독관계일경우 null값으로 반환됨. 그래서 bool일때는 bool을반환, null은 true
    return typeof userProfileState?.profileOpened === 'boolean' ? userProfileState?.profileOpened : true;
  };

  const isSelectedPostType = (type: PostType) => {
    return type === postsType;
  };

  // Todo.
  // 좋아요 게시물 눌렀다가 다른 사람 게시글로 이동시
  // 게시물 선택 상태 초기화.(지금은 UseEffect라서 조금 딜레이 있음)
  useEffect(() => {
    setPostType('MY');
  }, [username]);

  return (
    <Fragment key={`${username}`}>
      <MainHeader />
      <BaseWrapper p="">
        {!userDataLoading && userData ? <UserProfileTemplate userData={userData} /> : <UserProfileLoading />}
        {isMyProfile() && (
          <WrapperRow h="60px" w="100%" jc="space-around" bc={'white'}>
            <FontAwesomeIcon
              icon={faIdBadge}
              size="2x"
              color={isSelectedPostType('MY') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              onClick={() => setPostType('MY')}
            />
            <FontAwesomeIcon
              icon={faPaw}
              size="2x"
              color={isSelectedPostType('LIKED') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              onClick={() => setPostType('LIKED')}
            />
          </WrapperRow>
        )}
        {isBlokingPerson() ? (
          <TextBase text={'차단한 계정입니다'} />
        ) : (
          <>
            {isProfileOpened() ? (
              <>
                {isSelectedPostType('MY') && <MyPosts username={username} itemsCount={12} />}
                {isSelectedPostType('LIKED') && <MyLikedPosts itemsCount={12} />}
              </>
            ) : (
              <TextBase text={'비공개 계정입니다.'} />
            )}
          </>
        )}
      </BaseWrapper>
    </Fragment>
  );
}

export default ProfileScreen;
