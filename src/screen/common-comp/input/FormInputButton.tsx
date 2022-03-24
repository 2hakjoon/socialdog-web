import React from 'react';
import styled from 'styled-components';
import ButtonSmallBlue, { IButtonSmallBlue } from '../button/ButtonSmallBlue';
import FormInput, { IFormInput } from './FormInput';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 12px;
  }
`;

interface IFormInputButton {
  input: IFormInput;
  button: IButtonSmallBlue;
}

function FormInputButton({ input: { ph, register, maxLen }, button: { title, onClick, enable } }: IFormInputButton) {
  return (
    <Wrapper>
      <FormInput ph={ph} register={register} maxLen={maxLen} />
      <ButtonSmallBlue title={title} onClick={onClick} enable={enable} />
    </Wrapper>
  );
}

export default FormInputButton;
