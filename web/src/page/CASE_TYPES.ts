import lodash from 'lodash';
export type CaseTypeKey =
  | 'normal_text'
  | 'camel_case'
  | 'snake_case'
  | 'snake_upper_case'
  | 'kebab_case';

export type CaseType = {
  label: string;
  key: CaseTypeKey;
  getTextFromNormalText: (string) => string;
  getNormalText: (string) => string;
};
export const CASE_TYPES: Array<CaseType> = [
  {
    label: 'Normal Text',
    key: 'normal_text',
    getTextFromNormalText: (text) => text,
    getNormalText: (text) => text,
  },
  {
    label: 'Camel Case',
    key: 'camel_case',
    getTextFromNormalText: (text) => lodash.camelCase(text),
    getNormalText: (text) => lodash.lowerCase(text),
  },
  {
    label: 'Snake Case',
    key: 'snake_case',
    getTextFromNormalText: (text) => lodash.snakeCase(text),
    getNormalText: (text) => lodash.lowerCase(text),
  },
  {
    label: 'Snake Upper Case',
    key: 'snake_upper_case',
    getTextFromNormalText: (text) => lodash.snakeCase(text).toUpperCase(),
    getNormalText: (text) => lodash.lowerCase(text),
  },
  {
    label: 'Kebab Case',
    key: 'kebab_case',
    getTextFromNormalText: (text) => lodash.kebabCase(text),
    getNormalText: (text) => lodash.lowerCase(text),
  },
];
