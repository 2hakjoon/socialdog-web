import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import ButtonSmallBlue from 'common/components/button/ButtonSmallBlue';
import ButtonSmallWhite from 'common/components/button/ButtonSmallWhite';
import ButtonUpload from 'common/components/button/ButtonUpload';
import ImageBase from 'common/components/image/ImageBase';
import WrapperButton from 'common/components/wrappers/WrapperButton';
import WrapperColumn from 'common/components/wrappers/WrapperColumn';
import WrapperRow from 'common/components/wrappers/WrapperRow';
import WrapperSquare from 'common/components/wrappers/WrapperSquare';
import styled from 'styled-components';

const ImgPreviewgrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  width: 100%;
  margin: 50px;
`;

interface IUpoladImgViewr {
  uploadedFiles: File[] | null | undefined;
  inputFileHandler: (e: BaseSyntheticEvent) => void;
  uploadedPhotos?: string[] | [];
  setUploadedPhotos?: Dispatch<SetStateAction<string[]>>;
  setUploadedFiles: Dispatch<SetStateAction<File[] | null | undefined>>;
}

function UploadImgViewer({
  uploadedFiles,
  setUploadedFiles,
  inputFileHandler,
  uploadedPhotos = [],
  setUploadedPhotos = () => {},
}: IUpoladImgViewr) {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const removeUploadedFiles = (selectedIdx: number) => {
    setUploadedFiles(uploadedFiles?.filter((file, idx) => idx !== selectedIdx));
  };

  const removeUploadedPhotos = (selectedIdx: number) => {
    if (uploadedPhotos.length === 1) {
      alert('사진 한장은 남아있어야 합니다.');
      return;
    }
    setUploadedPhotos(uploadedPhotos.filter((file, idx) => idx !== selectedIdx));
  };

  const removeAllUploadedPhotos = () => {
    setUploadedFiles([]);
  };

  const isEditPosting = () => {
    return uploadedPhotos.length > 0;
  };

  const shiftUploadedFile = (idx: number) => {
    if (!uploadedFiles || idx === 0) {
      return;
    }
    const swapArray = uploadedFiles;
    const temp = swapArray[idx - 1];
    swapArray[idx - 1] = swapArray[idx];
    swapArray[idx] = temp;
    setUploadedFiles([...swapArray]);
  };

  const shiftUploadedPhoto = (idx: number) => {
    if (!uploadedPhotos || idx === 0) {
      return;
    }
    const swapArray = uploadedPhotos;
    const temp = swapArray[idx - 1];
    swapArray[idx - 1] = swapArray[idx];
    swapArray[idx] = temp;
    setUploadedPhotos([...swapArray]);
  };

  useEffect(() => {
    if (!uploadedFiles) {
      setImgUrls(uploadedPhotos);
      return;
    }
    const objectUrl = Object.keys(uploadedFiles).map((_, idx) => URL.createObjectURL(uploadedFiles[idx]));
    setImgUrls([...objectUrl]);
    return () => imgUrls.forEach((imgUrl) => URL.revokeObjectURL(imgUrl));
  }, [uploadedFiles, uploadedPhotos]);

  return (
    <>
      <ImgPreviewgrid>
        {imgUrls.map((imgUrl, idx) => (
          <WrapperColumn ai={'flex-end'} key={imgUrl}>
            <WrapperButton>
              <FontAwesomeIcon
                size="lg"
                icon={faXmark}
                onClick={() => (isEditPosting() ? removeUploadedPhotos(idx) : removeUploadedFiles(idx))}
              />
            </WrapperButton>
            <WrapperSquare>
              <ImageBase key={Date.now()} url={imgUrl} />
            </WrapperSquare>
            {idx > 0 && (
              <WrapperRow w="100%" jc="center" p="4px 0 0 0">
                {isEditPosting() ? (
                  <ButtonSmallWhite title="<-" onClick={() => shiftUploadedPhoto(idx)} />
                ) : (
                  <ButtonSmallWhite title="<-" onClick={() => shiftUploadedFile(idx)} />
                )}
              </WrapperRow>
            )}
          </WrapperColumn>
        ))}
      </ImgPreviewgrid>
      {!isEditPosting() && (
        <WrapperRow w="200px" jc="space-around">
          <ButtonUpload onChange={inputFileHandler} multiple accept="image/*" />
          {Boolean(uploadedFiles?.length) && <ButtonSmallWhite title="전체삭제" onClick={removeAllUploadedPhotos} />}
        </WrapperRow>
      )}
    </>
  );
}

UploadImgViewer.defaultProps = {
  uploadedPhotos: [],
  setUploadedPhotos: () => {},
};

export default UploadImgViewer;
