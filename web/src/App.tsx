import { ThemeProvider } from '@emotion/react';
import React, { ReactElement } from 'react';

import Router from './component/Router';
import DKTheme from './DKTheme';

const App = (): ReactElement => (
  <ThemeProvider theme={DKTheme}>
    <Router />
  </ThemeProvider>
);

export default App;
