import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import App from '../../App';
it('Init with default', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
