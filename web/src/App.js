// @flow strict

import type { Node } from 'react';
import React from 'react';
import Dashboard from './component/Dashboard';
import Router from './component/Router';

export default function App(): Node {
  return (
    <Dashboard>
      <Router />
    </Dashboard>
  );
}
