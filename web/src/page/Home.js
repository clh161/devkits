// @flow
import React from 'react';
import type { Node } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
export default function Home(): Node {
  return (
    <div>
      <Helmet>
        <title>Devkits</title>
      </Helmet>
      <Grid container spacing={3}>
        <Typography variant="h4" component="h1">
          Devkits
        </Typography>
      </Grid>
    </div>
  );
}
