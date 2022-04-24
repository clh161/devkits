import { Divider, Grid } from '@mui/material';
import { decode, encode } from 'html-entities';
import React, { ReactElement, useState } from 'react';
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

  function onEncodedHTMLChanged(event) {
    const { value } = event.target;
    setEncodedHTMLText(value);
    setDecodedHTMLText(decode(value));
  }

  function onDecodedHTMLChanged(event) {
    const { value } = event.target;
    setDecodedHTMLText(value);
    setEncodedHTMLText(encode(value));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <textarea
          onChange={onDecodedHTMLChanged}
          placeholder='Decoded HTML'
          style={{
            width: '100%',
            minHeight: 160,
          }}
          value={decodedHTMLText}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <textarea
          onChange={onEncodedHTMLChanged}
          placeholder='Encoded HTML'
          style={{
            width: '100%',
            minHeight: 160,
          }}
          value={encodedHTMLText}
        />
      </Grid>
    </Grid>
  );
}
