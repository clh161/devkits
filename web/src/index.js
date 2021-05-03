// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HTMLEncoder from './page/HTMLEncoder';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TimestampConverter from './page/TimestampConverter';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <App>
              <Route path="/html-encoding">
                <HTMLEncoder />
              </Route>
              <Route path="/unix-timestamp-converter">
                <TimestampConverter />
              </Route>
            </App>
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
