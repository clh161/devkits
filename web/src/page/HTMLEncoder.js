// @flow strict
import React, { useState } from 'react';
import type { Node } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { encode, decode } from 'html-entities';
import { Helmet } from 'react-helmet';

type Props = {
  initText: string,
};

export default function HTMLEncoder({ initText }: Props): Node {
  const [decodedHTMLText, setDecodedHTMLText] = useState<string>(initText);
  const [encodedHTMLText, setEncodedHTMLText] = useState<string>(
    encode(initText)
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
        <title>HTML Encoder</title>
        <meta content="Encode or decode HTML into text." name="description" />
        <meta
          content="HTML Encoder, HTML Decoder, encoding HTML, decoding HTML"
          name="keywords"
        />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            HTML Encoder
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
