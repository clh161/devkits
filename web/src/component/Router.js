// @flow strict

import type { Node } from 'react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CaseTypeConverter from '../page/CaseTypeConverter';
import CSVEditor from '../page/CSVEditor';
import Home from '../page/Home';
import HTMLEncoder from '../page/HTMLEncoder';
import TimestampConverter from '../page/TimestampConverter';
import URLEncoder from '../page/URLEncoder';

type Config = {
  path: string,
  component: Node,
};

export const CONFIGS: Array<Config> = [
  {
    path: '/html-encoding',
    component: <HTMLEncoder initDecodedText={'Example: < > " \\\\\' &'} />,
  },
  { path: '/url-encoding', component: <URLEncoder /> },
  { path: '/unix-timestamp-converter', component: <TimestampConverter /> },
  { path: '/case-type-converter', component: <CaseTypeConverter /> },
  { path: '/csv-editor', component: <CSVEditor /> },
  { path: '/', component: <Home /> },
];

export default function Router(): Node {
  return (
    <BrowserRouter>
      <Switch>
        {CONFIGS.map((config) => {
          return (
            <Route key={config.path} path={config.path}>
              {config.component}
            </Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
