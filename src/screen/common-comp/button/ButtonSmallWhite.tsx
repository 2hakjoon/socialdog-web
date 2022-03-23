import React from 'react';
import styled from 'styled-components';

const Button = styled.button<IButtonProps>`
  padding: 6px 10px;
  background-color: ${(p) => (p.enable ? p.theme.color.achromatic.primaryWhite : p.theme.color.achromatic.darkGray)};
  color: ${(p) => (p.enable ? p.theme.color.achromatic.black : p.theme.color.achromatic.darkGray)};
  border-radius: 5px;
  border: 2px solid ${(p) => (p.enable ? p.theme.color.achromatic.black : p.theme.color.achromatic.lightGray)};
  flex-shrink: 0;
`;

interface IButtonProps {
  enable?: boolean;
}

interface IButtonSmallWhite extends IButtonProps {
  title: string;
  onClick: () => void;
}

function ButtonSmallWhite({ title, enable, onClick }: IButtonSmallWhite) {
  return (
    <Button type="button" onClick={onClick} disabled={!enable} enable={enable}>
      {title}
    </Button>
  );
}

ButtonSmallWhite.defaultProps = {
  enable: true,
};

export default ButtonSmallWhite;
