import React from 'react';
import TextBase from '../../src/screen/common-comp/texts/TextBase';

describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    cy.mount(<TextBase text={'테스트'} />);
  });
});
