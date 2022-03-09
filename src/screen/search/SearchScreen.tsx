import { useLazyQuery, useMutation } from '@apollo/client';
import { REQUEST_SUBSCRIBE } from 'apllo-gqls/subscribes';
import { FIND_USER_BY_USERNAME } from 'apllo-gqls/users';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainHeader from 'screen/common-comp/header/MainHeader';
import FormInput from 'screen/common-comp/input/FormInput';
import UserCardThin from 'screen/common-comp/user-card/UserCardThin';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import styled from 'styled-components';
import { FindUserByUsernameInputDto } from '__generated__/globalTypes';
import { MRequestSubscribe, MRequestSubscribeVariables } from '__generated__/MRequestSubscribe';
import {
  QFindUserByUsername,
  QFindUserByUsernameVariables,
  QFindUserByUsername_findUsersByUsername_data,
} from '__generated__/QFindUserByUsername';

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
  const [findUserByUsername] = useLazyQuery<QFindUserByUsername, QFindUserByUsernameVariables>(FIND_USER_BY_USERNAME);
  const { register, getValues } = useForm<FindUserByUsernameInputDto>();
  const [findResults, setFindresults] = useState<QFindUserByUsername_findUsersByUsername_data[] | null | undefined>();
  const navigage = useNavigate();

  const onSearch = async () => {
    const findUserResult = await findUserByUsername({ variables: { args: getValues() } });
    setFindresults(findUserResult.data?.findUsersByUsername.data);
  };

  const moveToProfile = (username: string) => {
    navigage(`/${username}`);
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper>
        <FormWrapper>
          <FormInput register={register('username')} ph={'검색어를 입력해주세요'} />
          <SButton onClick={onSearch}>검색</SButton>
        </FormWrapper>
        {findResults?.map((findResult) => (
          <WrapperRow>
            <UserCardThin
              key={findResult.id}
              photo={findResult.photo}
              username={findResult.username}
              dogname={findResult.dogname}
            />
          </WrapperRow>
        ))}
      </BaseWrapper>
    </>
  );
}

export default SearchScreen;
