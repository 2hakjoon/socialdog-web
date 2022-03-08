import React, { useEffect, useState } from 'react';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { useQuery } from '@apollo/client';
import { GET_MYPOSTS, USER_MYPROFILE_ALL } from 'apllo-gqls/users';
import ImageRound from 'screen/common-comp/image/ImageRound';
import TextBase from 'screen/common-comp/texts/TextBase';
import { QMeAll } from '__generated__/QMeAll';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { QGetMyPosts, QGetMyPostsVariables } from '__generated__/QGetMyPosts';
import PostSmallBox from './components/PostSmallBox';
import styled from 'styled-components';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'screen/routes';
import { Link } from 'react-router-dom';
import ModalBase from 'screen/common-comp/modal/ModalBase';

const PostsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0px 4px;
`;

function ProfileScreen() {
  const [postsLimit, setPostsLimit] = useState<number>(3);

  const { data: userData, loading: userDataLoading } = useQuery<QMeAll>(USER_MYPROFILE_ALL);
  const user = userData?.me.data;
  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchPostsMore,
  } = useQuery<QGetMyPosts, QGetMyPostsVariables>(GET_MYPOSTS, {
    variables: { args: { offset: 0, limit: postsLimit } },
  });
  console.log(postsData, postsLoading);
  const posts = postsData?.getMyPosts.data;
  const [modalOpen, setModalOpen] = useState(false);

  // 다음페이지 데이터 요청
  useEffect(() => {
    if (posts && postsLimit > 3) {
      if (posts.length + 3 === postsLimit) {
        fetchPostsMore({ variables: { args: { offset: posts?.length, limit: 3 } } });
      }
    }
  }, [postsData]);

  const toNextPage = async () => {
    setPostsLimit((prev) => prev + 3);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {userDataLoading ? (
        <TextBase text={'로딩 중'} />
      ) : (
        <>
          <MainHeader />
          <BaseWrapper>
            {user && (
              <>
                <WrapperRow w="100%" jc="space-around" p={'20px 20px 30px 20px'} bc={'white'}>
                  <Link to={routes.profileEdit}>
                    <WrapperColumn h="140px" jc="space-around">
                      <ImageRound size="90px" url={user.photo || ''} />
                      <WrapperRow>
                        <TextBase text={user.username} p="0 6px" />
                        <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                      </WrapperRow>
                    </WrapperColumn>
                  </Link>
                  <WrapperColumn h="50px" jc="space-around" onClick={openModal}>
                    <TextBase text={'구독중'} />
                    <TextBase text={user.subscribings} />
                  </WrapperColumn>
                  <WrapperColumn h="50px" jc="space-around">
                    <TextBase text={'삼촌-이모들'} />
                    <TextBase text={user.subscribers} />
                  </WrapperColumn>
                </WrapperRow>
              </>
            )}
            <PostsGrid>
              {posts?.map((post) => (
                <WrapperSquare key={post.id}>
                  <BaseWrapper>
                    <PostSmallBox {...post} />
                  </BaseWrapper>
                </WrapperSquare>
              ))}
            </PostsGrid>
            <button type="button" onClick={toNextPage}>
              더 불러오기
            </button>
          </BaseWrapper>
        </>
      )}
      {modalOpen && <ModalBase closeModal={closeModal}>sadfasfd</ModalBase>}
    </>
  );
}

export default ProfileScreen;
