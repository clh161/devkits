// @flow strict
import { Grid, Link, Typography } from '@material-ui/core';
import type { Node } from 'react';
import React from 'react';

export default function Home(): Node {
  return (
    <Grid container spacing={3}>
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
  );
}
