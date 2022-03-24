import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color.achromatic.lightGray};
  padding: 8px 6px;
`;

export interface IFormInput {
  ph: string;
  register: any;
}

function FormInput({ ph, register }: IFormInput) {
  return <InputBase {...register} placeholder={ph} />;
}

export default FormInput;
