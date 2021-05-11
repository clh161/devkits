// @flow strict

import type { Node } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { CONFIGS } from './Router';

export default function HTMLMeta(): Node {
  const location = useLocation();
  const title =
    CONFIGS.find((config) => config.path === location.pathname)?.name ??
    'Devkits';

  return (
    <Helmet>
      <title>{title}</title>
      <meta content="Encode or decode HTML into text." name="description" />
      <meta
        content="HTML Encoder, HTML Decoder, encoding HTML, decoding HTML"
        name="keywords"
      />
    </Helmet>
  );
}
