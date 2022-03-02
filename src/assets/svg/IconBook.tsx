import React from 'react';
import { IIconprops } from 'assets/interface-icon';
import { theme } from 'assets/styles/theme';

function IconBook({ size, color }: IIconprops) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z" width={size} height={size} />
      <path
        fill={color}
        d="M21 4H7a2 2 0 1 0 0 4h14v13a1 1 0 0 1-1 1H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h13a1 1 0 0 1 1 1v1zM5 18a2 2 0 0 0 2 2h12V10H7a3.982 3.982 0 0 1-2-.535V18zM20 7H7a1 1 0 1 1 0-2h13v2z"
      />
    </svg>
  );
}

IconBook.defaultProps = {
  size: 24,
  color: theme.color.achromatic.black,
};

export default IconBook;
