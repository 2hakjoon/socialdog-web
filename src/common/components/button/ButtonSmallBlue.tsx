import React, { CSSProperties } from 'react';
import styled from 'styled-components';

const Button = styled.button<IButtonProps>`
  padding: 8px 12px;
  background-color: ${(p) => (p.enable ? p.theme.color.blue.primaryBlue : p.theme.color.achromatic.darkGray)};
  color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border-radius: 5px;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
`;

interface IButtonProps {
  style?: CSSProperties;
  enable?: boolean;
}

export interface IButtonSmallBlue extends IButtonProps {
  title: string;
  onClick: () => void;
}

function ButtonSmallBlue({ title, enable, onClick, style, ...rest }: IButtonSmallBlue) {
  return (
    <Button type="button" onClick={onClick} disabled={!enable} enable={enable} style={style} {...rest}>
      {title}
    </Button>
  );
}

ButtonSmallBlue.defaultProps = {
  enable: true,
  style: undefined,
};

export default ButtonSmallBlue;
