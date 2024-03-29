import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
`;

interface ImageBase {
  url: string;
}

function ImageBase({ url, ...rest }: ImageBase) {
  return <Image src={url} {...rest} />;
}

export default ImageBase;
