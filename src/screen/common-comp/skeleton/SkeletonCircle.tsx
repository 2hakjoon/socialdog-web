import React from 'react';
import styled from 'styled-components';

const GrayCircle = styled.div<ISkeletonCircle>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: 30px;
  background-color: ${({ theme }) => theme.color.achromatic.lightGray};
`;

interface ISkeletonCircle {
  size: string;
}

function SkeletonCircle({ size }: ISkeletonCircle) {
  return <GrayCircle size={size} />;
}

export default SkeletonCircle;
