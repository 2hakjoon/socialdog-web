import { gql, useApolloClient, useMutation } from '@apollo/client';
import { EDIT_POST } from 'apllo-gqls/posts';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonSubmit from 'screen/common-comp/button/ButtonSubmit';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import PlaceSearch from 'screen/common-comp/place-search/PlaceSearch';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { routes } from 'screen/routes';
import { alretError } from 'utils/alret';
import { EditPostInputDto } from '__generated__/globalTypes';
import { MEditPost, MEditPostVariables } from '__generated__/MEditPost';
import { QGetSubscribingPosts_getSubscribingPosts_data } from '__generated__/QGetSubscribingPosts';
import UploadImgViewer from '../components/UploadImgViewer';
import { IPostWriteTemplate } from '../PostWriteScreen';

interface IPostEditTemplate extends IPostWriteTemplate {
  postData: QGetSubscribingPosts_getSubscribingPosts_data;
}

function PostEditTemplate({
  postData,
  requestSignedUrl,
  searchResult,
  setSearchResult,
  uploadedFiles,
  inputFileHandler,
  uploadFilesToS3,
  setIsSaving,
}: IPostEditTemplate) {
  const navigate = useNavigate();
  const { cache } = useApolloClient();
  const { register, handleSubmit, formState, getValues, setValue } = useForm<EditPostInputDto>({ mode: 'onChange' });
  const [editPost] = useMutation<MEditPost, MEditPostVariables>(EDIT_POST);

  useEffect(() => {
    console.log(postData);
    setValue('contents', postData.contents);
    setSearchResult({ value: { description: postData.address, place_id: postData.placeId } });
  }, []);

  const onSubmitForm = async (formData: EditPostInputDto) => {
    setIsSaving(true);
    try {
      let photoUrls = JSON.parse(postData.photos);
      if (uploadedFiles) {
        const res = await requestSignedUrl();
        const preSignedUrls = res.data?.createPreSignedUrls;
        if (!preSignedUrls?.ok) {
          throw new Error('PreSignedUrl 요청 에러');
        }
        const uploadResult = await uploadFilesToS3(uploadedFiles!, preSignedUrls.urls!);
        photoUrls = uploadResult.map((result) => {
          if (result.status !== 200) {
            throw new Error('s3 업로드 에러');
          }
          if (!result.config.url) {
            throw new Error('s3 업로드 에러');
          }
          return result.config.url.split('?Content')[0];
        });
        console.log(photoUrls);
      }
      const createOrEditRes = await editPost({
        variables: {
          args: {
            ...formData,
            postId: postData.id,
            address: searchResult?.value.description,
            placeId: searchResult?.value.place_id,
            photoUrls,
          },
        },
      });
      if (!createOrEditRes.data?.editPost.ok) {
        window.alert('게시물 수정에 실패했습니다.');
        setIsSaving(false);
        return;
      }
      // 게시글 수정 캐싱
      cache.writeFragment({
        id: cache.identify({ id: postData.id, __typename: postData.__typename }),
        fragment: gql`
          fragment EditPost on Posts {
            id
            __typename
            address
            placeId
            photos
            contents
          }
        `,
        data: {
          __typename: postData.__typename,
          id: postData.id,
          address: searchResult?.value.description,
          placeId: searchResult?.value.place_id,
          photos: JSON.stringify(photoUrls),
          contents: formData.contents,
        },
      });
      window.alert('게시물 수정을 성공했습니다.');
      setIsSaving(false);
      navigate(routes.home, { replace: true });
    } catch (e) {
      console.log(e);
      alretError();
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <WrapperColumn w="100%">
        <UploadImgViewer
          uploadedFiles={uploadedFiles}
          inputFileHandler={inputFileHandler}
          uploadedImgUrls={JSON.parse(postData.photos)}
        />
        <WrapperRow jc="flex-start" w="100%">
          {searchResult?.value && <TextBase text={`이전 주소 : ${searchResult.value.description || '없음'}`} />}
        </WrapperRow>
        <PlaceSearch searchResult={searchResult} setSearchResult={setSearchResult} />
        <WrapperRow w="100%">
          <TextBase text="내용" />
          <FormTextArea register={register('contents', { required: '내용을 입력해주세요', maxLength: 300 })} />
        </WrapperRow>
        {formState.errors.contents?.message && <TextBase text={formState.errors.contents?.message} />}
        <ButtonSubmit title="저장" onClick={() => {}} />
      </WrapperColumn>
    </form>
  );
}
export default PostEditTemplate;
