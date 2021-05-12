// @flow strict

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CodeIcon from '@material-ui/icons/Code';
import HttpIcon from '@material-ui/icons/Http';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import type { Node } from 'react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CASE_TYPES } from '../page/CASE_TYPES';
import CaseTypeConverter from '../page/CaseTypeConverter';
import CSVEditor from '../page/CSVEditor';
import Home from '../page/Home';
import HTMLEncoder from '../page/HTMLEncoder';
import TimestampConverter from '../page/TimestampConverter';
import URLEncoder from '../page/URLEncoder';

type BaseConfig = {|
  path: string,
  component: Node,
  title: string,
  description: string,
  keywords: Array<string>,
|};

type Config =
  | {
      isHidden: true,
      ...BaseConfig,
    }
  | {
      isHidden: false,
      ...BaseConfig,
      icon: Node,
    };

export const CONFIGS: Array<Config> = [
  {
    isHidden: false,
    path: '/html-encoding',
    title: 'HTML Encoder',
    icon: <CodeIcon />,
    component: <HTMLEncoder initDecodedText={'Example: < > " \\\\\' &'} />,
    description: 'Encode or decode HTML into text.',
    keywords: [
      'HTML Encoder',
      'HTML Decoder',
      'encoding HTML',
      'decoding HTML',
    ],
  },
  {
    isHidden: false,
    path: '/url-encoding',
    component: <URLEncoder />,
    icon: <HttpIcon />,
    title: 'URL Encoder',
    description: 'Encode or decode HTML into text.',
    keywords: ['URL Encoder', 'URL Decoder', 'encoding URL', 'decoding URL'],
  },
  {
    isHidden: false,
    path: '/unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    component: <TimestampConverter />,
    icon: <AccessTimeIcon />,
    description: 'Unix timestamp and date time converter',
    keywords: ['timestamp', 'epoch', 'converter'],
  },
  {
    isHidden: false,
    path: '/case-type-converter',
    component: <CaseTypeConverter />,
    title: 'Case Type Converter',
    icon: <TextFieldsIcon />,
    description: 'Convert text into different case types',
    keywords: CASE_TYPES.map((type) => type.label),
  },
  {
    isHidden: false,
    path: '/csv-editor',
    component: <CSVEditor />,
    icon: <ViewComfyIcon />,
    title: 'CSV Editor',
    description: 'Live preview and edit csv file',
    keywords: ['csv', 'editor', 'edit', 'preview', 'live editor'],
  },
  {
    isHidden: true,
    path: '/',
    component: <Home />,
    title: 'Devkits',
    description: 'Collection of development tools',
    keywords: [
      'web',
      'web development',
      'development',
      'development tools',
      'devkits',
    ],
  },
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
