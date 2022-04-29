import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from 'apllo-gqls/posts';
import { useForm } from 'react-hook-form';
import FormTextArea from 'screen/common-comp/input/FormTextArea';
import PlaceSearch from 'screen/common-comp/place-search/PlaceSearch';
import TextBase from 'screen/common-comp/texts/TextBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import { alretError } from 'utils/alret';
import { CreatePostInputDto } from '__generated__/globalTypes';
import { MCreatePost, MCreatePostVariables } from '__generated__/MCreatePost';
import UploadImgViewer from '../components/UploadImgViewer';
import { IPostWriteTemplate } from '../PostWriteScreen';
import { useNavigate } from 'react-router-dom';
import { routes } from 'screen/routes';
import ButtonSubmit from 'screen/common-comp/button/ButtonSubmit';

function PostCreateTemplate({
  requestSignedUrl,
  searchResult,
  setSearchResult,
  uploadedFiles,
  inputFileHandler,
  uploadFilesToS3,
  setIsSaving,
  setUploadedFiles,
  resetCache = () => {},
}: IPostWriteTemplate) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getValues, setValue } = useForm<CreatePostInputDto>({ mode: 'onChange' });
  const [createPost] = useMutation<MCreatePost, MCreatePostVariables>(CREATE_POST);

  const onSubmitForm = async (formData: CreatePostInputDto) => {
    setIsSaving(true);
    if (!uploadedFiles?.length) {
      window.alert('파일을 업로드 해주세요.');
      setIsSaving(false);
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
      // console.log(uploadedUrl);
      const createOrEditRes = await createPost({
        variables: {
          args: {
            ...formData,
            address: searchResult?.value.description,
            placeId: searchResult?.value.place_id,
            photoUrls: uploadedUrl,
          },
        },
      });
      if (!createOrEditRes.data?.createPost.ok) {
        window.alert(createOrEditRes.data?.createPost.error);
        setIsSaving(false);
        return;
      }
      resetCache();
      navigate(routes.home, { replace: true });
      window.alert('게시물 업로드를 성공했습니다.');
      setIsSaving(false);
    } catch (e) {
      console.log(e);
      alretError();
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <WrapperColumn w="100%" p="0px 0px 50px 0px">
        <UploadImgViewer
          setUploadedFiles={setUploadedFiles}
          uploadedFiles={uploadedFiles}
          inputFileHandler={inputFileHandler}
        />
        <WrapperColumn w="100%" p="20px 0" ai="flex-start">
          <TextBase text={'주소검색'} m={'0px 0px 10px 0px'} />
          <PlaceSearch searchResult={searchResult} setSearchResult={setSearchResult} />
        </WrapperColumn>
        <WrapperColumn w="100%" p="20px 0 40px 0" ai="flex-start">
          <TextBase text="내용" m={'0px 0px 10px 0px'} />
          <FormTextArea register={register('contents', { required: '내용을 입력해주세요', maxLength: 300 })} />
        </WrapperColumn>
        {formState.errors.contents?.message && <TextBase text={formState.errors.contents?.message} />}
        <ButtonSubmit title="저장하기" onClick={() => {}} />
      </WrapperColumn>
    </form>
  );
}

export default PostCreateTemplate;
