// @flow strict

import type { Node } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { CONFIGS } from './Router';

export default function HTMLMeta(): Node {
  const location = useLocation();
  let config = CONFIGS.find((config) => config.path === location.pathname);
  const title = config?.name ?? 'Devkits';
  const description = config?.description ?? '';
  const keywords = config?.keywords ?? '';

  return (
    <Helmet>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={keywords} name="keywords" />
    </Helmet>
  );
}
