import React, { BaseSyntheticEvent, useEffect } from 'react';
import { makeReference, useApolloClient, useMutation } from '@apollo/client';
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
import styled from 'styled-components';
import TextBase from 'screen/common-comp/texts/TextBase';
import MainHeader from 'screen/common-comp/header/MainHeader';
import UploadImgViewer from './components/UploadImgViewer';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { CREATE_POST, CREATE_PRESIGNED_URL, EDIT_POST } from 'apllo-gqls/posts';
import { useLocation } from 'react-router-dom';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import { MEditPost, MEditPostVariables } from '__generated__/MEditPost';
import PlaceSearch from 'screen/common-comp/place-search/PlaceSearch';

interface ITextAreaComponent {
  height: string;
}

const TextAreaComponent = styled.textarea<ITextAreaComponent>`
  width: 100%;
  height: ${(p) => p.height};
  min-height: 200px;
  padding: 6px;
`;

export interface IPlaceSerchResult {
  value: {
    place_id: string;
    description: string;
  };
}

function PostEditScreen() {
  const { state } = useLocation();
  const postData = state as QGetSubscribingPosts_getSubscribingPosts_data;
  const [editPost] = useMutation<MEditPost, MEditPostVariables>(EDIT_POST);

  const client = useApolloClient();
  const [createPost] = useMutation<MCreatePost, MCreatePostVariables>(CREATE_POST);
  const [createPreSignedURl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const { register, handleSubmit, formState, getValues, setValue } = useForm<CreatePostInputDto>({ mode: 'onChange' });
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>();
  const [searchResult, setSearchResult] = useState<IPlaceSerchResult>();
  const [searchResultEmpty, setSearchResultEmpty] = useState<boolean>(false);
  const [textAreaHeight, setTextAreaHeight] = useState<string>('50px');

  useEffect(() => {
    if (searchResult) {
      changeSearchResultError();
    }
  }, [searchResult]);

  useEffect(() => {
    console.log(postData);
    if (isEditPost()) {
      // setUploadedFiles(JSON.parse(postData.photos));
      setSearchResult({ value: { description: postData.address, place_id: postData.placeId } });
      setValue('contents', postData.contents);
    }
  }, []);

  const isEditPost = () => {
    return postData;
  };

  const inputFileHandler = (e: BaseSyntheticEvent) => {
    if (Object.keys(e.target.files).length > 5) {
      window.alert('파일은 최대 5개만 업로드 할 수 있습니다.');
      return;
    }
    setUploadedFiles(e.target.files);
  };

  const requestSignedUrl = async () => {
    console.log(uploadedFiles);
    const filesDto: FileInputDto[] = [];
    if (uploadedFiles) {
      for (let i = 0; i < Object.keys(uploadedFiles).length; i++) {
        filesDto.push({ filename: `${USER_PHOTO}${dayjs()}_${uploadedFiles[i].name}`, fileType: FileType.IMAGE });
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

  const changeSearchResultError = () => {
    if (searchResult?.value.description && searchResult?.value.place_id) {
      setSearchResultEmpty(false);
    } else {
      setSearchResultEmpty(true);
    }
  };

  const onSubmitForm = async (formData: CreatePostInputDto) => {
    if (!uploadedFiles) {
      window.alert('파일을 업로드 해주세요.');
      return;
    }
    if (!(searchResult?.value.description && searchResult.value.place_id)) {
      changeSearchResultError();
      return;
    }
    try {
      const res = await requestSignedUrl();
      const preSignedUrls = res.data?.createPreSignedUrls;
      if (!preSignedUrls?.ok) {
        throw new Error('PreSignedUrl 요청 에러');
      }
      const uploadResult = await uploadFilesToS3(uploadedFiles!, preSignedUrls.urls!);
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
      const createOrEditRes = isEditPost()
        ? await editPost({
            variables: {
              args: {
                ...formData,
                postId: postData.id,
                address: searchResult.value.description,
                placeId: searchResult.value.place_id,
              },
            },
          })
        : await createPost({
            variables: {
              args: {
                ...formData,
                address: searchResult.value.description,
                placeId: searchResult.value.place_id,
                photos: uploadedUrl,
              },
            },
          });
      if (createOrEditRes.errors) {
        window.alert('게시물 업로드에 실패했습니다.');
        return;
      }
      client.cache.modify({
        id: client.cache.identify(makeReference('ROOT_QUERY')),
        fields: {
          getSubscribingPosts(existingData) {
            console.log(existingData.data);
            return {
              ...existingData,
              data: [
                {
                  __typename: 'PostAll',
                  id: `${Date.now}`,
                  photos: JSON.stringify(uploadedUrl),
                  placeId: searchResult.value.place_id,
                  address: searchResult.value.description,
                  contents: formData.contents,
                  liked: false,
                },
                ...existingData.data,
              ],
            };
          },
        },
      });
      window.alert('게시물 업로드를 성공했습니다.');
    } catch (e) {
      console.log(e);
      alretError();
    }
  };

  return (
    <>
      <MainHeader />
      <BaseWrapper p={'0 16px'}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <WrapperColumn w="100%">
            <UploadImgViewer uploadedFiles={uploadedFiles} inputFileHandler={inputFileHandler} />
            <PlaceSearch searchResult={searchResult} setSearchResult={setSearchResult} />
            {postData?.address && <TextBase text={`이전 입력 장소 : ${postData.address}`} />}
            {searchResultEmpty && <TextBase text="장소를 입력해주세요." />}
            <WrapperRow w="100%">
              <TextBase text="내용" />
              <TextAreaComponent
                {...register('contents', { required: '내용을 입력해주세요', maxLength: 300 })}
                placeholder=""
                onChange={({ target }) => {
                  setTextAreaHeight(`${target.scrollHeight - 4}px`);
                }}
                height={textAreaHeight}
              />
            </WrapperRow>
            {formState.errors.contents?.message && <TextBase text={formState.errors.contents?.message} />}
            {postData ? <button type="submit">수정완료</button> : <button type="submit">작성완료</button>}
          </WrapperColumn>
        </form>
      </BaseWrapper>
    </>
  );
}

export default PostEditScreen;
