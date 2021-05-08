// @flow strict

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';
import HTMLEncoder from './page/HTMLEncoder';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimestampConverter from './page/TimestampConverter';
import Home from './page/Home';
import CaseTypeConverter from './page/CaseTypeConverter';

const root = document.getElementById('root');
root != null &&
  ReactDOM.render(
    <React.StrictMode>
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
    </React.StrictMode>,
    root
  );

reportWebVitals();
