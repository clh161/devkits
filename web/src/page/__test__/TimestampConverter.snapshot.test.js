// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import TimestampConverter from '../TimestampConverter';

it('renders correctly', () => {
  const tree = renderer
    .create(<TimestampConverter initTimestamp={1620432665} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
