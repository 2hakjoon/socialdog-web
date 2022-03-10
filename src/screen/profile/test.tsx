import React, { useEffect, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import { GET_MYPOSTS, GET_USER_POSTS } from 'apllo-gqls/posts';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import PostSmallBox from './components/PostSmallBox';
import styled from 'styled-components';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'screen/routes';
import { useNavigate, useParams } from 'react-router-dom';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import { SUBSCRIBER, SUBSCRIBING } from 'utils/constants';
import SubscriberAndRequests from './templates/SubscriberAndRequests';
import SubscribingAndRequests from './templates/SubscribingAndRequests';
import { QGetUserProfile, QGetUserProfileVariables } from '__generated__/QGetUserProfile';
import { QGetUserPosts, QGetUserPostsVariables } from '__generated__/QGetUserPosts';
import { QMe } from '__generated__/QMe';
import { MRequestSubscribe, MRequestSubscribeVariables } from '__generated__/MRequestSubscribe';
import { REQUEST_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { QGetMyPosts, QGetMyPostsVariables } from '__generated__/QGetMyPosts';

function ProfileScreen() {
  const [postsLimit, setPostsLimit] = useState<number>(3);

  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetMyPosts, QGetMyPostsVariables>(GET_MYPOSTS, {
    variables: { args: { offset: 0, limit: postsLimit } },
  });
  console.log(postsData, postsLoading);
  const posts = postsData?.getMyPosts.data;

  // 다음페이지 데이터 요청
  useEffect(() => {
    if (posts && postsLimit > 3) {
      if (posts.length + 3 === postsLimit) {
        fetchPostsMore({ variables: { args: { offset: posts?.length, limit: 3 } } });
      }
    }
  }, [postsData]);

  const toNextPage = async () => {
    // fetchPostsMore({ variables: { offset: 0, limit: postsLimit } });
    setPostsLimit((prev) => prev + 3);
  };

  return (
    <>
      <>
        <MainHeader />
        <BaseWrapper>
          <button type="button" onClick={toNextPage}>
            더 불러오기
          </button>
        </BaseWrapper>
      </>
    </>
  );
}

export default ProfileScreen;
