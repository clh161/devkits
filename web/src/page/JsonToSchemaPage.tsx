import { Alert, Stack, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';

export default function JsonToSchemaPage(): ReactElement {
  const [json, setJson] = useState<string>('{}');
  const jsonParsingError = getJsonPrasingError(json);

  return (
    <Stack spacing={1}>
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
