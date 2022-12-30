import { ThemeProvider } from '@emotion/react';
import React, { ReactElement } from 'react';

import Router from './component/Router';
import DKTheme from './DKTheme';
export default function App(): ReactElement {
  return (
    <ThemeProvider theme={DKTheme}>
      <Router />
    </ThemeProvider>
  );
}
