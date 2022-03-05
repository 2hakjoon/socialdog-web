import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { EDIT_PROFILE, USER_MYPROFILE_ALL } from 'apllo-gqls/users';
import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonBasic from 'screen/common-comp/button/ButtonBasic';
import MainHeader from 'screen/common-comp/header/MainHeader';
import FormInput from 'screen/common-comp/input/FormInput';
import TextBase from 'screen/common-comp/texts/TextBase';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import styled from 'styled-components';
import { EditProfileInputDto } from '__generated__/globalTypes';
import { MEditProfile, MEditProfileVariables } from '__generated__/MEditProfile';
import { QMeAll } from '__generated__/QMeAll';

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
  const client = useApolloClient();
  const { data: userData } = useQuery<QMeAll>(USER_MYPROFILE_ALL);
  const user = userData?.me.data;
  const [editProfile, { data }] = useMutation<MEditProfile, MEditProfileVariables>(EDIT_PROFILE, {
    update(cache) {
      cache.modify({
        fields: {
          todos(existingData = []) {
            const newTodoRef = cache.writeFragment({
              data: { ...user, username: '엥?' },
              fragment: gql`
                fragment EditUserProfile on UserProfile {
                  id
                }
              `,
            });
            return [...existingData, newTodoRef];
          },
        },
      });
    },
  });
  const { register, handleSubmit } = useForm<EditProfileInputDto>();

  const onSubmit = async (formData: EditProfileInputDto) => {
    console.log(formData);
    const result = await editProfile({
      variables: {
        args: {
          username: formData.username,
          dogname: formData.dogname,
        },
      },
    });
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper>
        <FormWrapper>
          <WrapperColumn w={'100%'} ai="flex-start">
            <TextBase text={'사용자 이름'} />
            <FormInput register={register('username')} ph={'내용을 입력해주세용'} />
          </WrapperColumn>
          <WrapperColumn w={'100%'} ai="flex-start">
            <TextBase text={'강아지 이름'} />
            <FormInput register={register('dogname')} ph={'내용을 입력해주세용'} />
          </WrapperColumn>
          <ButtonBasic title="저장하기" onClick={handleSubmit(onSubmit)} />
        </FormWrapper>
      </BaseWrapper>
    </>
  );
}

export default ProfileEditScreen;
