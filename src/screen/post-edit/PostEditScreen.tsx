import React from 'react';
import { gql, useMutation } from '@apollo/client';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { MCreatePost, MCreatePostVariables } from '../../../__generated__/MCreatePost';
import { MCreatePreSignedUrls, MCreatePreSignedUrlsVariables } from '../../../__generated__/MCreatePreSignedUrls';
import { CreatePostInputDto, CreatePreSignedUrlsInputDto } from '../../../__generated__/globalTypes';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CREATE_POST = gql`
  mutation MCreatePost($args: CreatePostInputDto!) {
    createPost(args: $args) {
      ok
      error
    }
  }
`;

const CREATE_PRESIGNED_URL = gql`
  mutation MCreatePreSignedUrls($args: CreatePreSignedUrlsInputDto!) {
    createPreSignedUrls(args: $args) {
      ok
      error
    }
  }
`;

function PostEditScreen() {
  const [createPost] = useMutation<MCreatePost, MCreatePostVariables>(CREATE_POST);
  const [createPreSignedURl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const { register, handleSubmit, formState, getValues, setValue } = useForm<CreatePostInputDto>();
  const [fileUpload, setFileUpload] = useState<FileList | null>();

  const onSubmitForm = (data: CreatePostInputDto) => {
    console.log(fileUpload);
    const filesDto = [];
    if (fileUpload) {
      for (let i = 0; i < Object.keys(fileUpload).length; i = +1) {
        console.log(fileUpload[i]);
      }
    }
  };

  return (
    <BaseWrapper>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <WrapperColumn>
          <input
            type="file"
            name={'이미지 업로드'}
            onChange={(e) => setFileUpload(e.target.files)}
            multiple
            accept="image/*"
          />
          <input {...register('address', { required: true, maxLength: 50 })} type={'text'} />
          <input {...register('contents', { required: true, maxLength: 300 })} type={'text'} />
          <input {...register('placeId', { required: true, maxLength: 50 })} type={'text'} />
          <button type="submit">작성완료</button>
        </WrapperColumn>
      </form>
    </BaseWrapper>
  );
}

export default PostEditScreen;
