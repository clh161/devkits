import { Grid, TextField } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import type { CaseType, CaseTypeKey } from './CASE_TYPES';
import { CASE_TYPES } from './CASE_TYPES';
const DEFAULT_NORMAL_TEXT = 'This is an example text';
const DEFAULT_TEXTS: Record<CaseTypeKey, string> = getTexts(
  'normal_text',
  DEFAULT_NORMAL_TEXT
);
export function getTexts(
  key: string,
  text: string
): Record<CaseTypeKey, string> {
  const caseType = CASE_TYPES.find((caseType) => caseType.key === key);
  const normalText = caseType?.getNormalText(text) ?? '';
  return CASE_TYPES.reduce((texts, ct) => {
    texts[ct.key] =
      ct.key === key ? text : ct.getTextFromNormalText(normalText);
    return texts;
  }, {});
}
export default function CaseTypeConverter(): ReactElement {
  const [texts, setTexts] =
    useState<Record<CaseTypeKey, string>>(DEFAULT_TEXTS);
  return (
    <Grid container spacing={3}>
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
  );
}
