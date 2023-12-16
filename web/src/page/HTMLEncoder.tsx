import { Divider, Grid, TextField } from '@mui/material';
import { decode, encode } from 'html-entities';
import React, { ChangeEvent, ReactElement, useState } from 'react';

type Props = {
  initDecodedText?: string;
  initEncodedText?: string;
};

export default function HTMLEncoder({
  initDecodedText,
  initEncodedText,
}: Props): ReactElement {
  const [decodedHTMLText, setDecodedHTMLText] = useState<string>(
    initDecodedText ?? decode(initEncodedText)
  );
  const [encodedHTMLText, setEncodedHTMLText] = useState<string>(
    initEncodedText ?? encode(initDecodedText)
  );

  const onEncodedHTMLChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setEncodedHTMLText(value);
    setDecodedHTMLText(decode(value));
  };

  const onDecodedHTMLChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setDecodedHTMLText(value);
    setEncodedHTMLText(encode(value));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label='Decoded HTML'
          maxRows={15}
          minRows={5}
          multiline
          onChange={onDecodedHTMLChanged}
          placeholder='Decoded HTML'
          style={{
            width: '100%',
          }}
          value={decodedHTMLText}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label='Encoded HTML'
          maxRows={15}
          minRows={5}
          multiline
          onChange={onEncodedHTMLChanged}
          placeholder='Encoded HTML'
          style={{
            width: '100%',
          }}
          value={encodedHTMLText}
        />
      </Grid>
    </Grid>
  );
}
