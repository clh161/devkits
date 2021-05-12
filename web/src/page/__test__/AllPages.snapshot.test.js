// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { CONFIGS } from '../../component/Router';

it('All Pages', () => {
  jest.spyOn(Date, 'now').mockImplementation(() => 946684800 * 1000);

  CONFIGS.forEach((config) => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={[config.path]}>
          {config.component}
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(Helmet.peek()).toMatchSnapshot();
  });
});
