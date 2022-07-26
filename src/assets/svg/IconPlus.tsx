import React from 'react';
import { theme } from 'assets/styles/theme';
import { IIconprops } from 'assets/interface-icon';

function IconPlus({ size, color }: IIconprops) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill={color}
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6 6V7h2v4h4v2h-4v4h-2v-4H7v-2h4z"
      />
    </svg>
  );
}

IconPlus.defaultProps = {
  size: 24,
  color: theme.color.achromatic.black,
};
export default IconPlus;
