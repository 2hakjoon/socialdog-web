import React from 'react';
import MainHeader from '../../../src/screen/common-comp/header/MainHeader';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    cy.url();
    cy.viewport(500, 750);
    cy.mount(
      <MockedProvider>
        <Router>
          <Routes>
            <Route path={'*'} element={<MainHeader />} />
          </Routes>
        </Router>
      </MockedProvider>,
    );
  });
});
