import React from 'react';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CREATE_PRESIGNED_URL } from 'apllo-gqls/posts';
import { EDIT_PROFILE, MYPROFILE } from 'apllo-gqls/users';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonBasic from 'screen/common-comp/button/ButtonBasic';
import MainHeader from 'screen/common-comp/header/MainHeader';
import ImageRound from 'screen/common-comp/image/ImageRound';
import FormInput from 'screen/common-comp/input/FormInput';
import TextBase from 'screen/common-comp/texts/TextBase';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import styled from 'styled-components';
import { EditProfileInputDto, FileType } from '__generated__/globalTypes';
import { MCreatePreSignedUrls, MCreatePreSignedUrlsVariables } from '__generated__/MCreatePreSignedUrls';
import { MEditProfile, MEditProfileVariables } from '__generated__/MEditProfile';
import { QMe } from '__generated__/QMe';

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
  const { data: userData, loading: userDataLoading } = useQuery<QMe>(MYPROFILE);
  const user = userData?.me.data;
  const [editProfile, { data }] = useMutation<MEditProfile, MEditProfileVariables>(EDIT_PROFILE);
  const [createPresignedUrl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const { register, handleSubmit, setValue } = useForm<EditProfileInputDto>();
  const [uploadedFile, setUploadedFile] = useState<FileList | null>();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<null | string>();

  const onSubmit = async (formData: EditProfileInputDto) => {
    let newPhoto: string | undefined = '';
    if (uploadedFile) {
      const resPresigned = await createPresignedUrl({
        variables: { args: { files: [{ filename: uploadedFile[0].name, fileType: FileType.IMAGE }] } },
      });
      if (!resPresigned.data?.createPreSignedUrls.ok) {
        window.alert('preSignedUrl발급 실패');
        return;
      }
      const s3Res = await axios.put(resPresigned.data.createPreSignedUrls.urls[0], uploadedFile[0]);
      if (s3Res.status !== 200) {
        window.alert('s3 업로드 에러');
        return;
      }
      newPhoto = s3Res?.config?.url && s3Res?.config?.url.split('?Content')[0];
    }

    const result = await editProfile({
      variables: {
        args: {
          photo: newPhoto || user?.photo,
          username: formData.username,
          dogname: formData.dogname,
        },
      },
    });
    if (result.data?.editProfile.ok) {
      client.cache.writeFragment({
        id: `UserProfileAll:${user?.id}`,
        fragment: gql`
          fragment NewProfileAll on UserProfileAll {
            __typename
            id
            username
            dogname
            photo
          }
        `,
        data: {
          __typename: 'UserProfileAll',
          id: user?.id,
          username: formData.username || user?.username,
          dogname: formData.dogname || user?.dogname,
          photo: newPhoto || user?.photo,
        },
      });
      client.cache.writeFragment({
        id: `UserProfile:${user?.id}`,
        fragment: gql`
          fragment NewProfile on UserProfile {
            __typename
            id
            username
            photo
          }
        `,
        data: {
          __typename: 'UserProfile',
          id: user?.id,
          username: formData.username || user?.username,
          photo: newPhoto || user?.photo,
        },
      });
      window.alert('저장되었습니다.');
    }
  };

  useEffect(() => {
    if (!uploadedFile) {
      setUploadedFileUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedFile[0]);
    setUploadedFileUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedFile]);

  useEffect(() => {
    if (user) {
      setValue('dogname', user.dogname);
      setValue('username', user.username);
    }
  }, [user]);

  return (
    <>
      <MainHeader />
      <BaseWrapper>
        {user && (
          <>
            <WrapperColumn>
              {user.photo ? (
                <ImageRound url={uploadedFileUrl || user.photo} size="80px" />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} size="5x" />
              )}
              <input
                type="file"
                name={'이미지 업로드'}
                onChange={(e) => {
                  setUploadedFile(e.target.files);
                }}
                accept="image/*"
              />
            </WrapperColumn>
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
          </>
        )}
      </BaseWrapper>
    </>
  );
}

export default ProfileEditScreen;
