import { Grid, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
type Props = {
  initDecodedText?: string;
  initEncodedText?: string;
};

export default function JsonToSchemaPage({}: Props): ReactElement {
  const [json, setJson] = useState<string>('{}');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
}
