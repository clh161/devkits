// @flow strict
import { Grid, TextField, Typography } from '@material-ui/core';
import type { Node } from 'react';
import React, { useState } from 'react';

import HTMLMeta from '../component/HTMLMeta';
import type { CaseType, CaseTypeKey } from './CASE_TYPES';
import { CASE_TYPES } from './CASE_TYPES';

const DEFAULT_NORMAL_TEXT = 'This is an example text';

const DEFAULT_TEXTS: { [CaseTypeKey]: string } = getTexts(
  'normal_text',
  DEFAULT_NORMAL_TEXT
);

export function getTexts(key: string, text: string): { [CaseTypeKey]: string } {
  const caseType = CASE_TYPES.find((caseType) => caseType.key === key);
  const normalText = caseType?.getNormalText(text) ?? '';
  return CASE_TYPES.reduce((texts, ct) => {
    texts[ct.key] =
      ct.key === key ? text : ct.getTextFromNormalText(normalText);
    return texts;
  }, {});
}

export default function CaseTypeConverter(): Node {
  const [texts, setTexts] = useState<{ [CaseTypeKey]: string }>(DEFAULT_TEXTS);
  return (
    <div>
      <HTMLMeta />
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
