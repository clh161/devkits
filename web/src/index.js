// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HTMLEncoder from './page/HTMLEncoder';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <App>
              <Route path="/html-encode-decode">
                <HTMLEncoder />
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
