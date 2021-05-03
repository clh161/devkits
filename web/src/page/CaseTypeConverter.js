// @flow
import React from 'react';
import type { Node } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
export default function CaseTypeConverter(): Node {
  return (
    <div>
      <Helmet>
        <title>Case Type Converter</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Case Type Converter
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
