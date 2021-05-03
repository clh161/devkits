// @flow
import React from 'react';
import type { Node } from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
export default function Home(): Node {
  return (
    <div>
      <Helmet>
        <title>Devkits</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography block component="h1" variant="h4">
            Devkits
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            An opensource collection of development tools
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="link">
            <Link href="https://github.com/clh161/devkits" target="_blank">
              Github Repository
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
