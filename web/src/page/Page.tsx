import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import HTMLMeta from '../component/HTMLMeta';
import { RouterConfig } from '../component/RouterConfig';
type Props = {
  children: ReactElement;
  pageConfig: RouterConfig;
};
export default function Page({ children, pageConfig }: Props): ReactElement {
  return (
    <Stack sx={{ p: 2 }}>
      <HTMLMeta pageConfig={pageConfig} />
      <Typography component='h1' gutterBottom variant='h4'>
        {pageConfig.title}
      </Typography>
      <Typography component='h2' gutterBottom variant='subtitle2'>
        {pageConfig.description}
      </Typography>
      {children}
    </Stack>
  );
}
