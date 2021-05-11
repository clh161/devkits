// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import HTMLEncoder from '../HTMLEncoder';

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
});
