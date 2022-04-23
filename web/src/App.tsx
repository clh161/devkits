import React, { ReactElement } from 'react';
import Dashboard from './component/Dashboard';
import Router from './component/Router';
export default function App(): ReactElement {
  return (
    <Dashboard>
      <Router />
    </Dashboard>
  );
}
