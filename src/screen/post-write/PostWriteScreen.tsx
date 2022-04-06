import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { FetchResult, makeReference, useApolloClient, useMutation } from '@apollo/client';
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
import Compressor from 'compressorjs';
import ModalBackground from 'screen/common-comp/modal/ModalBackground';
import LoadingSpinner from 'assets/svg/LoadingSpinner';

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
  resetCache?: () => void;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
}

function PostWriteScreen() {
  const { state } = useLocation();
  const postData = state as QGetSubscribingPosts_getSubscribingPosts_data;

  const client = useApolloClient();
  const [createPreSignedURl] = useMutation<MCreatePreSignedUrls, MCreatePreSignedUrlsVariables>(CREATE_PRESIGNED_URL);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>();
  const [searchResult, setSearchResult] = useState<IPlaceSerchResult>();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const inputFileHandler = async (e: BaseSyntheticEvent) => {
    const fileList = e.target.files;
    if (Object.keys(fileList).length > 5) {
      window.alert('파일은 최대 5개만 업로드 할 수 있습니다.');
      return;
    }
    setUploadedFiles(fileList);
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

  const compressImg = async (file: File) => {
    const compressedFile = new Promise((resolve, reject) => {
      (() =>
        new Compressor(file, {
          quality: 0.6,
          maxHeight: 1200,
          maxWidth: 1200,
          success: resolve,
          error: reject,
        }))();
    }).then((result: any) => {
      const file = new File([result], result.name, { lastModified: result.lastModified });
      return file;
    });
    return compressedFile;
  };

  const uploadFilesToS3 = async (files: FileList | File[], urls: string[]) => {
    const promisedUpload = urls.map(async (url, idx) => axios.put(url, await compressImg(files[idx])));
    console.log(promisedUpload);
    return Promise.all(promisedUpload).catch(() => {
      throw new Error('s3 업로드 에러');
    });
  };

  const resetCache = () => {
    client.cache.modify({
      id: client.cache.identify(makeReference('ROOT_QUERY')),
      fields: {
        getSubscribingPosts() {
          return undefined;
        },
        getUserPosts() {
          return undefined;
        },
        getPostsByAddress() {
          return undefined;
        },
      },
    });
  };

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
            setIsSaving={setIsSaving}
          />
        ) : (
          <PostCreateTemplate
            requestSignedUrl={requestSignedUrl}
            uploadFilesToS3={uploadFilesToS3}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            uploadedFiles={uploadedFiles}
            inputFileHandler={inputFileHandler}
            resetCache={resetCache}
            setIsSaving={setIsSaving}
          />
        )}
      </BaseWrapper>
      {isSaving && (
        <ModalBackground closeModal={() => setIsSaving(false)}>
          <LoadingSpinner />
        </ModalBackground>
      )}
    </>
  );
}

export default PostWriteScreen;
