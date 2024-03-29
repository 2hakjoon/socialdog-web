import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from 'react';
import { FetchResult, makeReference, useApolloClient } from '@apollo/client';
import BaseWrapper from 'common/components/wrappers/BaseWrapper';
import { MCreatePreSignedUrls } from '../../__generated__/MCreatePreSignedUrls';
import { FileInputDto, FileType } from '../../__generated__/globalTypes';
import axios, { AxiosResponse } from 'axios';
import { POST_PHOTO } from 'utils/constants';
import dayjs from 'dayjs';
import MainHeader from 'common/components/header/MainHeader';
import { useLocation } from 'react-router-dom';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import PostCreateTemplate from './template/PostCreateTemplate';
import PostEditTemplate from './template/PostEditTemplate';
import Compressor from 'compressorjs';
import ModalBackground from 'common/components/modal/ModalBackground';
import LoadingSpinner from 'assets/svg/LoadingSpinner';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import useCreatePreSignedUrl from 'common/hooks/useCreatePreSignedUrl';

export interface IPlaceSerchResult {
  value: {
    place_id: string;
    description: string;
  };
}

export interface IPostWriteTemplate {
  searchResult: IPlaceSerchResult | null | undefined;
  setSearchResult: Dispatch<SetStateAction<any>>;
  uploadedFiles: File[] | null | undefined;
  inputFileHandler: (e: BaseSyntheticEvent) => void;
  requestSignedUrl: () => Promise<FetchResult<MCreatePreSignedUrls, Record<string, any>, Record<string, any>>>;
  uploadFilesToS3: (files: File[], urls: string[]) => Promise<AxiosResponse<any, any>[]>;
  resetCache?: () => void;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
  setUploadedFiles: Dispatch<SetStateAction<File[] | null | undefined>>;
}

function PostWriteScreen() {
  const { state } = useLocation();
  const postData = state as QGetSubscribingPosts_getSubscribingPosts_data;

  const client = useApolloClient();
  const [createPreSignedURl] = useCreatePreSignedUrl();
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>();
  const [searchResult, setSearchResult] = useState<IPlaceSerchResult>();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const inputFileHandler = async (e: BaseSyntheticEvent) => {
    const fileList = e.target.files;
    if (Object.keys(fileList).length + (uploadedFiles?.length || 0) > 5) {
      window.alert('파일은 최대 5개만 업로드 할 수 있습니다.');
      return;
    }
    if (uploadedFiles?.length) {
      setUploadedFiles([...uploadedFiles, ...fileList]);
      return;
    }
    setUploadedFiles([...fileList]);
  };

  const requestSignedUrl = async () => {
    console.log(uploadedFiles);
    const filesDto: FileInputDto[] = [];
    if (uploadedFiles) {
      for (let i = 0; i < Object.keys(uploadedFiles).length; i++) {
        filesDto.push({ filename: `${POST_PHOTO}/${dayjs()}_${uploadedFiles[i].name}`, fileType: FileType.IMAGE });
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

  const uploadFilesToS3 = async (files: File[], urls: string[]) => {
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
      <BaseWrapper>
        {postData ? (
          <PostEditTemplate
            postData={postData}
            requestSignedUrl={requestSignedUrl}
            uploadFilesToS3={uploadFilesToS3}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
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
            setUploadedFiles={setUploadedFiles}
            inputFileHandler={inputFileHandler}
            resetCache={resetCache}
            setIsSaving={setIsSaving}
          />
        )}
      </BaseWrapper>
      {isSaving && (
        <ModalBackground closeModal={() => setIsSaving(false)}>
          <WrapperColumn w="100%" h="100%" jc="center">
            <LoadingSpinner />
          </WrapperColumn>
        </ModalBackground>
      )}
    </>
  );
}

export default PostWriteScreen;
