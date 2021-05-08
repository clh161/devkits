// @flow strict

import type { Node } from 'react';
import React from 'react';
import Dashboard from './component/Dashboard';
import { Router } from './Router';

export default function App(): Node {
  return (
    <Dashboard>
      <Router />
    </Dashboard>
  );
}
