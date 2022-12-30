import { Alert, Stack, TextField } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';

import { getKotlinClass } from '../json-converter/JsonToKotlin';

export default function JsonToSchemaPage(): ReactElement {
  const [json, setJson] = useState<string>('{}');
  const jsonParsingError = getJsonPrasingError(json);
  const [lastValidJson, setLastValidJson] = useState<string>('{}');

  useEffect(() => {
    if (jsonParsingError == null) {
      setLastValidJson(json);
    }
  }, [json]);

  const kotlinClasses = getKotlinClass(JSON.parse(lastValidJson), 'root');
  return (
    <Stack spacing={2}>
      <TextField
        label='Json schema'
        maxRows={15}
        minRows={5}
        multiline
        onChange={(event) => {
          const { value } = event.target;
          setJson(value);
        }}
        placeholder='Json schema'
        style={{
          width: '100%',
        }}
        value={json}
      />
      {jsonParsingError != null && (
        <Alert color='error'>{jsonParsingError}</Alert>
      )}
      {kotlinClasses.map((kotlinClass) => {
        return (
          <TextField
            key={kotlinClass.className}
            label={kotlinClass.className}
            maxRows={15}
            minRows={5}
            multiline
            placeholder='Json schema'
            style={{
              width: '100%',
            }}
            value={kotlinClass.string}
          />
        );
      })}
    </Stack>
  );
}

function getJsonPrasingError(json: string): string | null {
  try {
    JSON.parse(json);
  } catch (e) {
    return e.message;
  }
  return null;
}
