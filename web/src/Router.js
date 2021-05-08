// @flow strict

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import HTMLEncoder from './page/HTMLEncoder';
import TimestampConverter from './page/TimestampConverter';
import CaseTypeConverter from './page/CaseTypeConverter';
import React from 'react';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/html-encoding">
          <HTMLEncoder initDecodedText={'Example: < > " \\\\\' &'} />
        </Route>
        <Route path="/unix-timestamp-converter">
          <TimestampConverter />
        </Route>
        <Route path="/case-type-converter">
          <CaseTypeConverter />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
