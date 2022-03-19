import React, { useState } from 'react';
import styled from 'styled-components';

interface ITextAreaComponent {
  height: string;
}

const TextAreaComponent = styled.textarea<ITextAreaComponent>`
  width: 100%;
  height: ${(p) => p.height};
  min-height: 200px;
  padding: 6px;
`;

interface IFormTextArea {
  register: any;
}

// Todo: auto sizing
function FormTextArea({ register }: IFormTextArea) {
  // const [textAreaHeight, setTextAreaHeight] = useState<string>('50px');

  return (
    <TextAreaComponent
      {...register}
      placeholder=""
      height="300px"
      // onChange={({ target }) => {
      //   setTextAreaHeight(`${target.scrollHeight - 4}px`);
      // }}
      // height={textAreaHeight}
    />
  );
}

export default FormTextArea;
