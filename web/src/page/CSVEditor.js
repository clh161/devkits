// @flow strict
import React, { useState } from 'react';
import type { Node } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { encode, decode } from 'html-entities';
import { Helmet } from 'react-helmet';

type Props = {
  initDecodedText?: string,
  initEncodedText?: string,
};

export default function CSVEditor({
  initDecodedText,
  initEncodedText,
}: Props): Node {
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
    <div>
      <Helmet>
        <title>CSV Editor</title>
        <meta content="Live preview and edit csv file" name="description" />
        <meta
          content="csv, editor, edit, preview, live editor"
          name="keywords"
        />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            CSV Editor
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <textarea
            onChange={onDecodedHTMLChanged}
            placeholder="Decoded HTML"
            style={{ width: '100%', minHeight: 160 }}
            value={decodedHTMLText}
          />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <textarea
            onChange={onEncodedHTMLChanged}
            placeholder="Encoded HTML"
            style={{ width: '100%', minHeight: 160 }}
            value={encodedHTMLText}
          />
        </Grid>
      </Grid>
    </div>
  );
}
