import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import HTMLMeta from '../component/HTMLMeta';
import { RouterConfig } from '../component/RouterConfig';

type Props = {
  children: ReactElement;
  pageConfig: RouterConfig;
};

export default function Page({ children, pageConfig }: Props): ReactElement {
  const { title, description } = pageConfig;

  return (
    <Stack sx={{ p: 2 }}>
      <HTMLMeta pageConfig={pageConfig} />
      <Typography component='h1' variant='h4'>
        {title}
      </Typography>
      <Typography
        component='h2'
        gutterBottom
        sx={{ mb: 2 }}
        variant='subtitle2'
      >
        {description}
      </Typography>
      {children}
    </Stack>
  );
}
