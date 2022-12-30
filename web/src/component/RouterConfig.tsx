import {
  AccessTime as AccessTimeIcon,
  Code as CodeIcon,
  Home,
  Http as HttpIcon,
  TextFields as TextFieldsIcon,
  ViewComfy as ViewComfyIcon,
} from '@mui/icons-material';
import React, { ReactElement } from 'react';

import { CASE_TYPES } from '../page/CASE_TYPES';
import CaseTypeConverter from '../page/CaseTypeConverter';
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
    description:
      'Protect your HTML code with our easy-to-use HTML encoder. Simply enter your code to convert special characters into HTML entities.',
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
    description:
      'Our URL encoder tool helps you create properly formatted URLs for your website or application. Simply enter the text you want to include in the URL" Our tool will convert any special characters or spaces into the appropriate URL-safe format, ensuring that your links work correctly and are easy to share.',
    keywords: ['URL Encoder', 'URL Decoder', 'encoding URL', 'decoding URL'],
  },
  {
    isHidden: false,
    path: '/unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    component: <TimestampConverter />,
    icon: <AccessTimeIcon />,
    description:
      'Our Unix timestamp converter makes it easy to work with timestamps in your web development projects. Simply enter a timestamp or a date and time, and our tool will convert it to the other format. Whether you&apos;re working with Unix timestamps or human-readable dates and times, our converter has you covered.',
    keywords: ['timestamp', 'epoch', 'converter'],
  },
  {
    isHidden: false,
    path: '/case-type-converter',
    component: <CaseTypeConverter />,
    title: 'Case Type Converter',
    icon: <TextFieldsIcon />,
    description:
      'Our case type converter tool makes it easy to change the capitalization of your text. Simply enter the text you want to convert and select the desired case type. Our tool can convert text to upper case, lower case, sentence case, and more.',
    keywords: CASE_TYPES.map((type) => type.label),
  },
  {
    isHidden: false,
    path: '/csv-editor',
    component: <CSVEditor />,
    icon: <ViewComfyIcon />,
    title: 'CSV Editor',
    description:
      'Our CSV editor makes it easy to work with CSV (comma-separated value) files in your web development projects. Simply upload a CSV file or paste your data into the editor, and you can easily add, remove, or modify entries. Our tool also allows you to convert your CSV data to other formats, such as JSON or Excel.',
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
