import React from 'react';
import { theme } from 'assets/styles/theme';
import { IIconprops } from 'assets/interface-icon';

function IconPlus({ size, color }: IIconprops) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path fill={color} d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </svg>
  );
}

IconPlus.defaultProps = {
  size: 24,
  color: theme.color.achromatic.black,
};
export default IconPlus;
