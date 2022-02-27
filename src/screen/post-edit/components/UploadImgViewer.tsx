import React, { BaseSyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import ImageBase from 'screen/common-comp/Image/ImageBase';
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
  uploadedFiles: FileList | null | undefined;
  inputFileHandler: (e: BaseSyntheticEvent) => void;
}

function UploadImgViewer({ uploadedFiles, inputFileHandler }: IUpoladImgViewr) {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!uploadedFiles) {
      setImgUrls([]);
      return;
    }
    const objectUrl = Object.keys(uploadedFiles).map((_, idx) => URL.createObjectURL(uploadedFiles[idx]));
    setImgUrls([...objectUrl]);
    return () => imgUrls.forEach((imgUrl) => URL.revokeObjectURL(imgUrl));
  }, [uploadedFiles]);

  console.log(imgUrls);
  return (
    <>
      <ImgPreviewgrid>
        {imgUrls.map((imgUrl, idx) => (
          <WrapperSquare>
            <ImageBase key={Date.now()} url={imgUrl} />
          </WrapperSquare>
        ))}
      </ImgPreviewgrid>
      <input
        type="file"
        name={'이미지 업로드'}
        onChange={(e) => {
          inputFileHandler(e);
        }}
        multiple
        accept="image/*"
      />
    </>
  );
}

export default UploadImgViewer;