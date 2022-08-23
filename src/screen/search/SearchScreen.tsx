import React from 'react';
import MainHeader from 'common/components/header/MainHeader';
import FormInput from 'common/components/input/FormInput';
import TextBase from 'common/components/texts/TextBase';
import UserCardThin from 'common/components/user-card/UserCardThin';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import styled from 'styled-components';
import UserCardThinLoading from 'common/components/user-card/UserCardThinLoading';
import MainFooter from 'common/components/footer/MainFooter';
import useFindUserByUsername from './hooks/useFindUserByUsername';
import useGetProfileOpenUser from './hooks/useGetProfileOpenUser';
import useFindUserForm from './hooks/useFindUserForm';

const FormWrapper = styled.div`
  width: 100%;
  height: 54px;
  padding: 10px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  align-items: center;
`;

const SButton = styled.button`
  height: 100%;
  width: 50px;
  margin-left: 14px;
  cursor: pointer;
`;

function SearchScreen() {
  const { findUserByUsername, findUserData, findUserLoading } = useFindUserByUsername();
  const { profileOpenUsers, profileOpenUserLoading } = useGetProfileOpenUser();
  const { register, getValues } = useFindUserForm();

  const onSearch = async () => {
    await findUserByUsername({ variables: { args: getValues() } });
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper p={''}>
        <WrapperRow w="100%" jc="center" h="30px">
          <TextBase text={'친구 찾기'} />
        </WrapperRow>
        <FormWrapper>
          <FormInput register={register('username')} ph={'검색어를 입력해주세요'} />
          <SButton onClick={onSearch}>검색</SButton>
        </FormWrapper>
        <WrapperColumn p={'0 8px'} w="100%">
          {findUserLoading || profileOpenUserLoading ? (
            Array(5)
              .fill('')
              .map(() => <UserCardThinLoading key={Math.random()} />)
          ) : (
            <>
              {findUserData?.findUsersByUsername.data?.map((findResult) => (
                <UserCardThin key={findResult.id} {...findResult} />
              ))}
              {!findUserData?.findUsersByUsername.data && (
                <WrapperColumn w="100%" p={'10px 0'}>
                  <TextBase text={'추천친구 목록'} />
                  {profileOpenUsers?.map((user) => (
                    <UserCardThin key={user.id} {...user} />
                  ))}
                </WrapperColumn>
              )}
            </>
          )}
        </WrapperColumn>
      </BaseWrapper>
      <MainFooter />
    </>
  );
}

export default SearchScreen;
