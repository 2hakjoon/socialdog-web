import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  disabled: boolean;
}

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: ${(p) => (p.disabled ? p.theme.color.achromatic.darkGray : p.theme.color.blue.primaryBlue)};
  color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border: none;
  border-radius: 100px;
`;

interface IButtonSubmit {
  title: string;
  onClick: (a: any) => void;
  enable?: boolean;
}

function ButtonSubmit({ title, onClick, enable }: IButtonSubmit) {
  return (
    <Button type="submit" onClick={onClick} disabled={!enable}>
      {title}
    </Button>
  );
}

ButtonSubmit.defaultProps = {
  enable: true,
};

export default ButtonSubmit;
