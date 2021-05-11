// @flow strict

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../page/Home';
import HTMLEncoder from '../page/HTMLEncoder';
import TimestampConverter from '../page/TimestampConverter';
import CaseTypeConverter from '../page/CaseTypeConverter';
import type { Node } from 'react';
import React from 'react';
import CSVEditor from '../page/CSVEditor';
import URLEncoder from '../page/URLEncoder';

export default function Router(): Node {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/html-encoding">
          <HTMLEncoder initDecodedText={'Example: < > " \\\\\' &'} />
        </Route>
        <Route path="/url-encoding">
          <URLEncoder />
        </Route>
        <Route path="/unix-timestamp-converter">
          <TimestampConverter />
        </Route>
        <Route path="/case-type-converter">
          <CaseTypeConverter />
        </Route>
        <Route path="/csv-editor">
          <CSVEditor />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
