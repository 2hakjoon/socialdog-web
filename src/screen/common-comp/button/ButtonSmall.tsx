import React from 'react';
import styled from 'styled-components';

const Button = styled.button<IButtonProps>`
  padding: 8px 12px;
  background-color: ${(p) => (p.enable ? p.theme.color.blue.primaryBlue : p.theme.color.achromatic.darkGray)};
  color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border-radius: 5px;
  border: none;
`;

interface IButtonProps {
  enable?: boolean;
}

interface IButtonSmall extends IButtonProps {
  title: string;
  onClick: () => void;
}

function ButtonSmall({ title, enable, onClick }: IButtonSmall) {
  return (
    <Button type="button" onClick={onClick} enable={enable}>
      {title}
    </Button>
  );
}

ButtonSmall.defaultProps = {
  enable: true,
};

export default ButtonSmall;
