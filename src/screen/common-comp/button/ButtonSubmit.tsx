import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.blue.primaryBlue};
  color: ${({ theme }) => theme.color.achromatic.primaryWhite};
  border: none;
  border-radius: 100px;
`;

interface IButtonSubmit {
  title: string;
  onClick: (a: any) => void;
}

function ButtonSubmit({ title, onClick }: IButtonSubmit) {
  return <Button onClick={onClick}>{title}</Button>;
}

export default ButtonSubmit;
