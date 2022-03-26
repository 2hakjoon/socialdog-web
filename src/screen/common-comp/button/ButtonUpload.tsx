import { theme } from 'assets/styles/theme';
import React, { BaseSyntheticEvent, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import TextBase from '../texts/TextBase';

const SLabel = styled.label`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.color.blue.primaryBlue};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.achromatic.primaryWhite};
`;

interface IButtonUpload {
  onChange: (e: BaseSyntheticEvent) => void;
  multiple?: boolean | undefined;
  accept: string | undefined;
}

function ButtonUpload({ onChange, multiple, accept }: IButtonUpload) {
  return (
    <>
      <SLabel htmlFor="input-file">
        <TextBase text={'업로드'} color={theme.color.achromatic.primaryWhite} />
      </SLabel>
      <input
        style={{ display: 'none' }}
        id="input-file"
        type="file"
        name={'이미지 업로드'}
        onChange={onChange}
        multiple={multiple}
        accept={accept}
      />
    </>
  );
}

ButtonUpload.defaultProps = {
  multiple: undefined,
};

export default ButtonUpload;
