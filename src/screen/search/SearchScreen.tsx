import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FIND_USER_BY_USERNAME, GET_PROFILE_OPEN_USER } from 'apllo-gqls/users';
import { useForm } from 'react-hook-form';
import MainHeader from 'screen/common-comp/header/MainHeader';
import FormInput from 'screen/common-comp/input/FormInput';
import TextBase from 'screen/common-comp/texts/TextBase';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { FindUserByUsernameInputDto } from '__generated__/globalTypes';
import { QFindUserByUsername, QFindUserByUsernameVariables } from '__generated__/QFindUserByUsername';
import { QGetProfileOpenUser } from '__generated__/QGetProfileOpenUser';
import UserCardThinLoading from 'screen/common-comp/user-card/UserCardThinLoading';

const FormWrapper = styled.div`
  width: 100%;
  height: 54px;
  padding: 10px;
  background-color: white;
  border-bottom: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  display: flex;
  align-items: center;
`;

const SInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 0px 12px;
  border: 2px solid ${({ theme }) => theme.color.achromatic.darkGray};
`;

const SButton = styled.button`
  height: 100%;
  width: 50px;
  margin-left: 14px;
`;

function SearchScreen() {
  const [findUserByUsername, { data: findUserData, loading: findUserLoading }] = useLazyQuery<
    QFindUserByUsername,
    QFindUserByUsernameVariables
  >(FIND_USER_BY_USERNAME);
  const { data: profileOpenUsers, loading: profileOpenUserLoading } =
    useQuery<QGetProfileOpenUser>(GET_PROFILE_OPEN_USER);
  const { register, getValues } = useForm<FindUserByUsernameInputDto>();

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
              .map(() => <UserCardThinLoading />)
          ) : (
            <>
              {findUserData?.findUsersByUsername.data?.map((findResult) => (
                <UserCardThin key={findResult.id} {...findResult} />
              ))}
              {!findUserData?.findUsersByUsername.data && (
                <WrapperColumn w="100%">
                  <TextBase text={'추천친구 목록'} />
                  {profileOpenUsers?.getProfileOpenUser.data?.map((user) => (
                    <UserCardThin key={user.id} {...user} />
                  ))}
                </WrapperColumn>
              )}
            </>
          )}
        </WrapperColumn>
      </BaseWrapper>
    </>
  );
}

export default SearchScreen;
