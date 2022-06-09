import React, { useState } from 'react';
import styled from 'styled-components';

interface ITextAreaComponent {
  height?: string;
  minHeight?: string;
}

const TextAreaComponent = styled.textarea<ITextAreaComponent>`
  width: 100%;
  height: ${(p) => p.height};
  min-height: ${(p) => p.minHeight};
  padding: 6px;
  resize: none;
`;

interface IFormTextArea extends ITextAreaComponent {
  register: any;
  maxLen?: number;
}

// Todo: auto sizing
function FormTextArea({ register, height, minHeight, maxLen }: IFormTextArea) {
  // const [textAreaHeight, setTextAreaHeight] = useState<string>('50px');

  return (
    <TextAreaComponent
      {...register}
      placeholder=""
      height={height}
      minHeight={minHeight}
      maxLength={maxLen}
      // onChange={({ target }) => {
      //   setTextAreaHeight(`${target.scrollHeight - 4}px`);
      // }}
      // height={textAreaHeight}
    />
  );
}

FormTextArea.defaultProps = {
  height: '300px',
  minHeight: '200px',
  maxLen: 299,
};

export default FormTextArea;
