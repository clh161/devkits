import {
  ViewComfy as ViewComfyIcon,
  TextFields as TextFieldsIcon,
  Http as HttpIcon,
  Code as CodeIcon,
  AccessTime as AccessTimeIcon,
  Home,
} from '@mui/icons-material';
import React, { ReactElement } from 'react';
import CaseTypeConverter from '../page/CaseTypeConverter';
import { CASE_TYPES } from '../page/CASE_TYPES';
import CSVEditor from '../page/CSVEditor';
import HTMLEncoder from '../page/HTMLEncoder';
import TimestampConverter from '../page/TimestampConverter';
import URLEncoder from '../page/URLEncoder';

type BaseConfig = {
  path: string;
  component: ReactElement;
  title: string;
  description: string;
  keywords: Array<string>;
};

export type RouterConfig =
  | ({
      isHidden: true;
    } & BaseConfig)
  | ({
      isHidden: false;
      icon: ReactElement;
    } & BaseConfig);

export const RouterConfigs: Array<RouterConfig> = [
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
