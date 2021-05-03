// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HTMLEncoder from './page/HTMLEncoder';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimestampConverter from './page/TimestampConverter';
import Home from './page/Home';
import CaseTypeConverter from './page/CaseTypeConverter';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <App>
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
          </App>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
