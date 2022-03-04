import { useMutation } from '@apollo/client';
import { EDIT_PROFILE } from 'apllo-gqls/users';
import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonBasic from 'screen/common-comp/button/ButtonBasic';
import MainHeader from 'screen/common-comp/header/MainHeader';
import FormInput from 'screen/common-comp/input/FormInput';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import styled from 'styled-components';
import { EditProfileInputDto } from '__generated__/globalTypes';
import { MEditProfile, MEditProfileVariables } from '__generated__/MEditProfile';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 60%;
  height: 100%;
  margin: 0 auto;
`;

function ProfileEditScreen() {
  const [editProfile] = useMutation<MEditProfile, MEditProfileVariables>(EDIT_PROFILE);
  const { register, handleSubmit } = useForm<EditProfileInputDto>();

  const onSubmit = (data: EditProfileInputDto) => {
    console.log(data);
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper>
        <FormWrapper>
          <FormInput register={register('username')} ph={'내용을 입력해주세용'} />
          <FormInput register={register('dogname')} ph={'내용을 입력해주세용'} />
          <ButtonBasic title="저장하기" onClick={handleSubmit(onSubmit)} />
        </FormWrapper>
      </BaseWrapper>
    </>
  );
}

export default ProfileEditScreen;
