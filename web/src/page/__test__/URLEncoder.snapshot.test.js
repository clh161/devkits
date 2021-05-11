// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import URLEncoder from '../URLEncoder';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/url-encoding',
  }),
}));

it('Init with default', () => {
  const tree = renderer.create(<URLEncoder />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
