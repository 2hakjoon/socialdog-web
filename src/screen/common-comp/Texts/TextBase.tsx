import React from 'react';
import styled from 'styled-components';

const Text = styled.span``;

interface ITextBase {
  text: string;
}

function TextBase({ text }: ITextBase) {
  return <Text>{text}</Text>;
}

export default TextBase;
