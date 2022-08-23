import React, { Fragment, useState, useEffect } from 'react';
import MainHeader from 'common/components/header/MainHeader';
import TextBase from 'common/components/texts/TextBase';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { BlockState } from '__generated__/globalTypes';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { theme } from 'assets/styles/theme';
import MyPosts from './templates/MyPosts';
import MyLikedPosts from './templates/MyLikedPosts';
import UserProfileTemplate from './templates/UserProfileTemplate';
import UserProfileLoading from './templates/UserProfileLoading';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import MainFooter from 'common/components/footer/MainFooter';
import useMyProfile from 'common/hooks/useMyProfile';
import useGetUserProfile from './hooks/useGetUserProfile';

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
  const { authUser } = useMyProfile();

  const { user, userProfileState, userDataLoading } = useGetUserProfile(username);

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
        {!userDataLoading && user ? <UserProfileTemplate user={user} userProfileState={userProfileState}/> : <UserProfileLoading />}
        {isMyProfile() && (
          <WrapperRow h="60px" w="100%" jc="space-around" bc={'white'}>
            <WrapperButton onClick={() => setPostType('MY')}>
              <FontAwesomeIcon
                icon={faIdBadge}
                size="2x"
                color={isSelectedPostType('MY') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              />
            </WrapperButton>
            <WrapperButton onClick={() => setPostType('LIKED')}>
              <FontAwesomeIcon
                icon={faPaw}
                size="2x"
                color={isSelectedPostType('LIKED') ? theme.color.blue.primaryBlue : theme.color.achromatic.darkGray}
              />
            </WrapperButton>
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
              <WrapperColumn p="50px 0" h="200px" jc={'space-between'}>
                <FontAwesomeIcon color={theme.color.achromatic.darkGray} size="4x" icon={faUserLock} />
                <TextBase color={theme.color.achromatic.darkGray} text={'비공계 계정입니다.'} />
              </WrapperColumn>
            )}
          </>
        )}
      </BaseWrapper>
      <MainFooter />
    </Fragment>
  );
}

export default ProfileScreen;
