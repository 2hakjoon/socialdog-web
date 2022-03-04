import React from 'react';
import styled from 'styled-components';

const Text = styled.span<ITextBase>`
  margin: ${(p) => p.m};
  padding: ${(p) => p.p};
`;

interface ITextBase {
  text?: string | null | number;
  m?: string;
  p?: string;
}

function TextBase({ text, p, m }: ITextBase) {
  return (
    <Text m={m} p={p}>
      {text}
    </Text>
  );
}

TextBase.defaultProps = {
  text: '',
  p: '0',
  m: '0',
};

export default TextBase;
