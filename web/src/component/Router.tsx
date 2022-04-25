import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Page from '../page/Page';
import Dashboard from './Dashboard';
import { RouterConfigs } from './RouterConfig';

export default function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          {RouterConfigs.map((config) => (
            <Route
              element={<Page pageConfig={config}>{config.component}</Page>}
              key={config.path}
              path={config.path}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
