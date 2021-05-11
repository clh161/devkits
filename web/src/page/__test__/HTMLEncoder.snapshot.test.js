// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import HTMLEncoder from '../HTMLEncoder';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/html-encoding',
  }),
}));
it('Init with decoded text', () => {
  const tree = renderer
    .create(<HTMLEncoder initDecodedText={'Example: < > " \\\' &'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Init with encoded text', () => {
  const tree = renderer
    .create(
      <HTMLEncoder
        initEncodedText={'Example: &lt; &gt; &quot; \\&apos; &amp;'}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(Helmet.peek()).toMatchSnapshot();
});
