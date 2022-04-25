import { Grid, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import HTMLMeta from '../component/HTMLMeta';
import { RouterConfig } from '../component/RouterConfig';
type Props = {
  children: ReactElement;
  pageConfig: RouterConfig;
};
export default function Page({ children, pageConfig }: Props): ReactElement {
  return (
    <div>
      <HTMLMeta pageConfig={pageConfig} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h4'>
            {pageConfig.title}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </div>
  );
}
