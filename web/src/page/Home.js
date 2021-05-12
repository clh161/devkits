// @flow strict
import { Grid, Link, Typography } from '@material-ui/core';
import type { Node } from 'react';
import React from 'react';

import HTMLMeta from '../component/HTMLMeta';

export default function Home(): Node {
  return (
    <div>
      <HTMLMeta />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography block component="h1" variant="h4">
            Devkits
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            An opensource project of collection of development tools
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">
            <Link href="https://github.com/clh161/devkits" target="_blank">
              Github Repository
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
