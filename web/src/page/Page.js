// @flow strict
import { Grid, Typography } from '@material-ui/core';
import type { Node } from 'react';
import React from 'react';

import HTMLMeta from '../component/HTMLMeta';
import type { Config } from '../component/Router';

type Props = {
  children: Node,
  pageConfig: Config,
};

export default function Page({ children, pageConfig }: Props): Node {
  return (
    <div>
      <HTMLMeta pageConfig={pageConfig} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            {pageConfig.title}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </div>
  );
}
