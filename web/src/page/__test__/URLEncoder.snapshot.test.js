// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import URLEncoder from '../URLEncoder';

it('Init with default', () => {
  const tree = renderer.create(<URLEncoder />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
