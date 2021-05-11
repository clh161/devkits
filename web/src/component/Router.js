// @flow strict

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CodeIcon from '@material-ui/icons/Code';
import HttpIcon from '@material-ui/icons/Http';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import type { Node } from 'react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CaseTypeConverter from '../page/CaseTypeConverter';
import CSVEditor from '../page/CSVEditor';
import Home from '../page/Home';
import HTMLEncoder from '../page/HTMLEncoder';
import TimestampConverter from '../page/TimestampConverter';
import URLEncoder from '../page/URLEncoder';

type Config =
  | {
      isHidden: true,
      path: string,
      component: Node,
    }
  | {
      isHidden: false,
      path: string,
      component: Node,
      icon: Node,
      name: string,
    };

export const CONFIGS: Array<Config> = [
  {
    isHidden: false,
    path: '/html-encoding',
    name: 'HTML Encoder',
    icon: <CodeIcon />,
    component: <HTMLEncoder initDecodedText={'Example: < > " \\\\\' &'} />,
  },
  {
    isHidden: false,
    path: '/url-encoding',
    component: <URLEncoder />,
    icon: <HttpIcon />,
    name: 'URL Encoder',
  },
  {
    isHidden: false,
    path: '/unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    component: <TimestampConverter />,
    icon: <AccessTimeIcon />,
  },
  {
    isHidden: false,
    path: '/case-type-converter',
    component: <CaseTypeConverter />,
    name: 'Case Type Converter',
    icon: <TextFieldsIcon />,
  },
  {
    isHidden: false,
    path: '/csv-editor',
    component: <CSVEditor />,
    icon: <ViewComfyIcon />,
    name: 'CSV Editor',
  },
  { isHidden: true, path: '/', component: <Home /> },
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
