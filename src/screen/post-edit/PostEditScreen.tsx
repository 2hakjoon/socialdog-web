import React, { BaseSyntheticEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import { MCreatePost, MCreatePostVariables } from '../../__generated__/MCreatePost';
import { MCreatePreSignedUrls, MCreatePreSignedUrlsVariables } from '../../__generated__/MCreatePreSignedUrls';
import { CreatePostInputDto, FileInputDto, FileType } from '../../__generated__/globalTypes';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { alretError } from 'utils/alret';
import { USER_PHOTO } from 'utils/constants';
import dayjs from 'dayjs';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

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
      urls
    }
  }
`;

function PostEditScreen() {
  const [createPost] = useMutation<MCreatePost, MCreatePostVariables>(CREATE_POST);
  const [createPreSignedURl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const { register, handleSubmit, formState, getValues, setValue } = useForm<CreatePostInputDto>();
  const [fileUpload, setFileUpload] = useState<FileList | null>();

  const inputFileHandler = (e: BaseSyntheticEvent) => {
    if (Object.keys(e.target.files).length > 4) {
      window.alert('파일은 최대 5개만 업로드 할 수 있습니다.');
      return;
    }
    setFileUpload(e.target.files);
  };

  const requestSignedUrl = async () => {
    console.log(fileUpload);
    const filesDto: FileInputDto[] = [];
    if (fileUpload) {
      for (let i = 0; i < Object.keys(fileUpload).length; i++) {
        filesDto.push({ filename: `${USER_PHOTO}${dayjs()}_${fileUpload[i].name}`, fileType: FileType.IMAGE });
      }
    }
    return createPreSignedURl({
      variables: {
        args: { files: filesDto },
      },
    });
  };

  const uploadFilesToS3 = async (files: FileList, urls: string[]) => {
    const promisedUpload = urls.map((url, idx) => axios.put(url, files[idx]));
    return Promise.all(promisedUpload).catch(() => {
      throw new Error('s3 업로드 에러');
    });
  };

  const onSubmitForm = async (formData: CreatePostInputDto) => {
    try {
      const res = await requestSignedUrl();
      const preSignedUrls = res.data?.createPreSignedUrls;
      if (!preSignedUrls?.ok) {
        throw new Error('PreSignedUrl 요청 에러');
      }
      const uploadResult = await uploadFilesToS3(fileUpload!, preSignedUrls.urls!);
      const uploadedUrl = uploadResult.map((result) => {
        if (result.status !== 200) {
          throw new Error('s3 업로드 에러');
        }
        if (!result.config.url) {
          throw new Error('s3 업로드 에러');
        }
        return result.config.url.split('?Content')[0];
      });
      console.log(uploadedUrl);
      await createPost({
        variables: {
          args: {
            ...formData,
            photos: uploadedUrl,
          },
        },
      });
      window.alert('게시물 업로드를 성공했습니다.');
    } catch (e) {
      console.log(e);
      alretError();
    }
  };
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);

  return (
    <BaseWrapper>
      <GooglePlacesAutocomplete apiKey={process.env.REACT_APP_GOOGLE_API_KEY} />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <WrapperColumn>
          <input type="file" name={'이미지 업로드'} onChange={inputFileHandler} multiple accept="image/*" />
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
