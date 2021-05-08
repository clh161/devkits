// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import CaseTypeConverter from '../CaseTypeConverter';

it('renders correctly', () => {
  const tree = renderer.create(<CaseTypeConverter />).toJSON();
  expect(tree).toMatchSnapshot();
});
