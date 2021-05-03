// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Divider, Grid, TextareaAutosize } from '@material-ui/core';
import { encode, decode } from 'html-entities';

type Props = {};
const DEFAULT_TEXT = 'Example: < > " \\\\\' &';

export default function HTMLEncoder(props: Props): Node {
  const [decodedHTMLText, setDecodedHTMLText] = useState<string>(DEFAULT_TEXT);
  const [encodedHTMLText, setEncodedHTMLText] = useState<string>(
    encode(DEFAULT_TEXT)
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
        <TextareaAutosize
          onChange={onDecodedHTMLChanged}
          style={{ width: '100%', minHeight: 160 }}
          value={decodedHTMLText}
          placeholder="Decoded HTML"
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextareaAutosize
          style={{ width: '100%', minHeight: 160 }}
          placeholder="Encoded HTML"
          value={encodedHTMLText}
          onChange={onEncodedHTMLChanged}
        />
      </Grid>
    </Grid>
  );
}
