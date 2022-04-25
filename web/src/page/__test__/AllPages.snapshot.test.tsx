import React from 'react';
import { Helmet } from 'react-helmet';
import renderer from 'react-test-renderer';

import { RouterConfigs } from '../../component/RouterConfig';
import Page from '../Page';
it('All Pages', () => {
  jest.spyOn(Date, 'now').mockImplementation(() => 946684800 * 1000);
  RouterConfigs.forEach((config) => {
    const tree = renderer
      .create(<Page pageConfig={config}>{config.component}</Page>)
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(Helmet.peek()).toMatchSnapshot();
  });
});
