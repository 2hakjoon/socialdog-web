import React from 'react';
import { theme } from 'assets/styles/theme';
import { IIconprops } from 'assets/interface-icon';

function IconSquare({ size, color }: IIconprops) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path color={color} d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z" />
    </svg>
  );
}

IconSquare.defaultProps = {
  size: 24,
  color: theme.color.achromatic.black,
};
export default IconSquare;
