// @flow strict

import type { Node } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { CONFIGS } from './Router';

export default function HTMLMeta(): Node {
  const location = useLocation();
  const config = CONFIGS.find((config) => config.path === location.pathname);
  if (config == null) {
    throw 'Config not found';
  }
  const { name, description, keywords } = config;

  return (
    <Helmet>
      <title>{name}</title>
      <meta content={description} name="description" />
      <meta content={keywords.join(', ')} name="keywords" />
    </Helmet>
  );
}
