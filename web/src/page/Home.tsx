import { Grid, Link, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
export default function Home(): ReactElement {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='body1'>
          An opensource project of collection of development tools
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='overline'>
          <Link href='https://github.com/clh161/devkits' target='_blank'>
            Github Repository
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
