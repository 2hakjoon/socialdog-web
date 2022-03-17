import React from 'react';
import styled from 'styled-components';

const GrayBox = styled.div<ISkeletonBox>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  margin: ${(p) => p.margin};
  background-color: #f5f5f5;
  border-radius: 10px;
`;

interface ISkeletonBox {
  width?: string;
  height?: string;
  margin?: string;
}

function SkeletonBox({ width, height, margin }: ISkeletonBox) {
  return <GrayBox width={width} height={height} margin={margin} />;
}
SkeletonBox.defaultProps = {
  width: '100%',
  height: '100%',
  margin: 0,
};

export default SkeletonBox;
