import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { FetchResult, useApolloClient, useMutation } from '@apollo/client';
import BaseWrapper from 'screen/common-comp/wrappers/BaseWrapper';
import { MCreatePreSignedUrls, MCreatePreSignedUrlsVariables } from '../../__generated__/MCreatePreSignedUrls';
import { FileInputDto, FileType } from '../../__generated__/globalTypes';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { USER_PHOTO } from 'utils/constants';
import dayjs from 'dayjs';
import MainHeader from 'screen/common-comp/header/MainHeader';
import { CREATE_PRESIGNED_URL } from 'apllo-gqls/posts';
import { useLocation } from 'react-router-dom';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import PostCreateTemplate from './template/PostCreateTemplate';
import PostEditTemplate from './template/PostEditTemplate';

export interface IPlaceSerchResult {
  value: {
    place_id: string;
    description: string;
  };
}

export interface IPostWriteTemplate {
  searchResult: IPlaceSerchResult | null | undefined;
  setSearchResult: Dispatch<SetStateAction<any>>;
  uploadedFiles: FileList | null | undefined;
  inputFileHandler: (e: BaseSyntheticEvent) => void;
  requestSignedUrl: () => Promise<FetchResult<MCreatePreSignedUrls, Record<string, any>, Record<string, any>>>;
  uploadFilesToS3: (files: FileList, urls: string[]) => Promise<AxiosResponse<any, any>[]>;
}

function PostWriteScreen() {
  const { state } = useLocation();
  const postData = state as QGetSubscribingPosts_getSubscribingPosts_data;

  const client = useApolloClient();
  const [createPreSignedURl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>();
  const [searchResult, setSearchResult] = useState<IPlaceSerchResult>();

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

  // Todo 게시글 캐싱

  // const updateCache = ({}) => {
  //   client.cache.modify({
  //     id: client.cache.identify(makeReference('ROOT_QUERY')),
  //     fields: {
  //       getSubscribingPosts(existingData) {
  //         console.log(existingData.data);
  //         return {
  //           ...existingData,
  //           data: [
  //             {
  //               __typename: 'PostAll',
  //               id: `${Date.now}`,
  //               photos: JSON.stringify(uploadedUrl),
  //               placeId: searchResult.value.place_id,
  //               address: searchResult.value.description,
  //               contents: formData.contents,
  //               liked: false,
  //             },
  //             ...existingData.data,
  //           ],
  //         };
  //       },
  //     },
  //   });
  // };

  return (
    <>
      <MainHeader />
      <BaseWrapper p={'0 16px'}>
        {postData ? (
          <PostEditTemplate
            postData={postData}
            requestSignedUrl={requestSignedUrl}
            uploadFilesToS3={uploadFilesToS3}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            uploadedFiles={uploadedFiles}
            inputFileHandler={inputFileHandler}
          />
        ) : (
          <PostCreateTemplate
            requestSignedUrl={requestSignedUrl}
            uploadFilesToS3={uploadFilesToS3}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            uploadedFiles={uploadedFiles}
            inputFileHandler={inputFileHandler}
          />
        )}
      </BaseWrapper>
    </>
  );
}

export default PostWriteScreen;
