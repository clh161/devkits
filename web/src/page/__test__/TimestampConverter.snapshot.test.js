// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import TimestampConverter from '../TimestampConverter';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/unix-timestamp-converter',
  }),
}));
it('renders correctly', () => {
  const tree = renderer
    .create(<TimestampConverter initTimestamp={1620432665} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
