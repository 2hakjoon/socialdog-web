import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import ButtonSmallWhite from 'screen/common-comp/button/ButtonSmallWhite';
import ButtonUpload from 'screen/common-comp/button/ButtonUpload';
import ImageBase from 'screen/common-comp/image/ImageBase';
import WrapperColumn from 'screen/common-comp/wrappers/WrapperColumn';
import WrapperRow from 'screen/common-comp/wrappers/WrapperRow';
import WrapperSquare from 'screen/common-comp/wrappers/WrapperSquare';
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
  uploadedImgUrls?: [string] | [];
  setUploadedFiles: Dispatch<SetStateAction<File[] | null | undefined>>;
}

function UploadImgViewer({ uploadedFiles, setUploadedFiles, inputFileHandler, uploadedImgUrls = [] }: IUpoladImgViewr) {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const removeUploadedPhoto = (selectedIdx: number) => {
    setUploadedFiles(uploadedFiles?.filter((file, idx) => idx !== selectedIdx));
  };

  const removeAllUploadedPhotos = () => {
    setUploadedFiles([]);
  };

  useEffect(() => {
    if (!uploadedFiles) {
      setImgUrls(uploadedImgUrls);
      return;
    }
    const objectUrl = Object.keys(uploadedFiles).map((_, idx) => URL.createObjectURL(uploadedFiles[idx]));
    setImgUrls([...objectUrl]);
    return () => imgUrls.forEach((imgUrl) => URL.revokeObjectURL(imgUrl));
  }, [uploadedFiles]);

  return (
    <>
      <ImgPreviewgrid>
        {imgUrls.map((imgUrl, idx) => (
          <WrapperColumn ai={'flex-end'}>
            <FontAwesomeIcon icon={faXmark} onClick={() => removeUploadedPhoto(idx)} />
            <WrapperSquare>
              <ImageBase key={Date.now()} url={imgUrl} />
            </WrapperSquare>
          </WrapperColumn>
        ))}
      </ImgPreviewgrid>
      <WrapperRow w="200px" jc="space-around">
        <ButtonUpload onChange={inputFileHandler} multiple accept="image/*" />
        {Boolean(uploadedFiles?.length) && <ButtonSmallWhite title="전체삭제" onClick={removeAllUploadedPhotos} />}
      </WrapperRow>
    </>
  );
}

UploadImgViewer.defaultProps = {
  uploadedImgUrls: [],
};

export default UploadImgViewer;
