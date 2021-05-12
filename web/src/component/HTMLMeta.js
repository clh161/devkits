// @flow strict

import type { Node } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';

import type { Config } from './Router';

type Props = {
  pageConfig: Config,
};

export default function HTMLMeta({ pageConfig }: Props): Node {
  const { title, description, keywords } = pageConfig;

  return (
    <Helmet>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={keywords.join(', ')} name="keywords" />
    </Helmet>
  );
}
