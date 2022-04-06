import React, { BaseSyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import ButtonSmallWhite from 'screen/common-comp/button/ButtonSmallWhite';
import ButtonUpload from 'screen/common-comp/button/ButtonUpload';
import ImageBase from 'screen/common-comp/image/ImageBase';
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
}

function UploadImgViewer({ uploadedFiles, inputFileHandler, uploadedImgUrls = [] }: IUpoladImgViewr) {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

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
          <WrapperSquare>
            <ImageBase key={Date.now()} url={imgUrl} />
          </WrapperSquare>
        ))}
      </ImgPreviewgrid>
      <WrapperRow>
        <ButtonUpload onChange={inputFileHandler} multiple accept="image/*" />
        <ButtonSmallWhite title="전체삭제" onClick={() => {}} />
      </WrapperRow>
    </>
  );
}

UploadImgViewer.defaultProps = {
  uploadedImgUrls: [],
};

export default UploadImgViewer;
