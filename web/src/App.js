// @flow strict

import React from 'react';
import Dashboard from './Dashboard';
import HTMLEncoder from './page/HTMLEncoder';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimestampConverter from './page/TimestampConverter';
import Home from './page/Home';
import CaseTypeConverter from './page/CaseTypeConverter';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Dashboard>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/html-encoding">
              <HTMLEncoder />
            </Route>
            <Route path="/unix-timestamp-converter">
              <TimestampConverter />
            </Route>{' '}
            <Route path="/case-type-converter">
              <CaseTypeConverter />
            </Route>
          </Dashboard>
        </Switch>
      </div>
    </Router>
  );
}
