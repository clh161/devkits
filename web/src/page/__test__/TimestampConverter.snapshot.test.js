// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import TimestampConverter from '../TimestampConverter';

it('renders correctly', () => {
  const tree = renderer.create(<TimestampConverter />).toJSON();
  expect(tree).toMatchSnapshot();
});
