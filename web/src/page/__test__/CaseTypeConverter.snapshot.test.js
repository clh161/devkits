// @flow

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/case-type-convertor',
  }),
}));
import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import CaseTypeConverter from '../CaseTypeConverter';
it('renders correctly', () => {
  const tree = renderer.create(<CaseTypeConverter />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
