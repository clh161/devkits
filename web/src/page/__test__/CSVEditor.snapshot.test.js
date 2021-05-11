// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import CSVEditor from '../CSVEditor';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/csv-editor',
  }),
}));
it('Init with default', () => {
  const tree = renderer.create(<CSVEditor />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
