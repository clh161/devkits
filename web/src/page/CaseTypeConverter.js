// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import lodash from 'lodash';

type CaseType = {
  label: string,
  key: string,
  getTextFromNormalText: (string) => string,
  getNormalText: (string) => string,
};

const CASE_TYPES: Array<CaseType> = [
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
];
const DEFAULT_NORMAL_TEXT = 'This is an example text';

const DEFAULT_TEXTS: [string, string] = getTexts(
  'normal_text',
  DEFAULT_NORMAL_TEXT
);

function getTexts(key: string, text: string) {
  const caseType = CASE_TYPES.find((caseType) => caseType.key === key);
  const normalText = caseType.getNormalText(text);
  return CASE_TYPES.reduce((texts, ct) => {
    texts[ct.key] = ct.getTextFromNormalText(normalText);
    return texts;
  }, {});
}

export default function CaseTypeConverter(): Node {
  const [texts, setTexts] = useState<[string, string]>(DEFAULT_TEXTS);
  return (
    <div>
      <Helmet>
        <title>Case Type Converter</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Case Type Converter
          </Typography>
        </Grid>
        {CASE_TYPES.map((caseType: CaseType) => {
          return (
            <Grid item key={caseType.key} xs={12}>
              <TextField
                fullWidth={true}
                label={caseType.label}
                onChange={(event) => {
                  const { value } = event.target;
                  setTexts(getTexts(caseType.key, value));
                }}
                value={texts[caseType.key]}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
