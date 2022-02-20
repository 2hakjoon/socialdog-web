import React from 'react';
import styled from 'styled-components';
import ImageBase from './ImageBase';

const Wrapper = styled.div<{ size: string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: ${(p) => p.size};
  overflow: hidden;
`;
interface IImageRound {
  size: string;
  url: string;
}

function ImageRound({ size, url }: IImageRound) {
  return (
    <Wrapper size={size}>
      <ImageBase url={url} />
    </Wrapper>
  );
}

export default ImageRound;
