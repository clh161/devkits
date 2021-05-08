// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import HTMLEncoder from '../HTMLEncoder';

it('renders correctly', () => {
  const tree = renderer
    .create(<HTMLEncoder initDecodedText={'Example: < > " \\\' &'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
