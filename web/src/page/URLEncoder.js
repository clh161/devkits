// @flow strict
import { Divider, Grid, Typography } from '@material-ui/core';
import type { Node } from 'react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const DEFAULT_URL =
  'https://devkits.net/json=%7B%0A%20%20%22user%22:%20%7B%0A%20%20%20%20%22id%22:%201,%0A%20%20%20%20%22name%22:%20%22devkits%22%0A%20%20%7D%0A%7D%0A';
const DECODED_URL = decodeURI(DEFAULT_URL);
export default function URLEncoder(): Node {
  const [encodedURL, setEncodedURL] = useState<string>(DEFAULT_URL);
  const [decodedURL, setDecodedURL] = useState<string>(DECODED_URL);

  function onEncodedURLChange(event) {
    const { value } = event.target;
    setEncodedURL(value);
    try {
      setDecodedURL(decodeURI(value));
    } catch (_) {
      setDecodedURL(value);
    }
  }

  function onDecodedURLChange(event) {
    const { value } = event.target;
    setDecodedURL(value);
    setEncodedURL(encodeURI(value));
  }

  return (
    <div>
      <Helmet>
        <title>URL Encoder</title>
        <meta content="Encode or decode URL." name="description" />
        <meta
          content="URL Encoder, URL Decoder, encoding URL, decoding URL"
          name="keywords"
        />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            URL Encoder
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <textarea
            onChange={onEncodedURLChange}
            placeholder="Encoded URL"
            style={{ width: '100%', minHeight: 160 }}
            value={encodedURL}
          />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <textarea
            onChange={onDecodedURLChange}
            placeholder="Decoded URL"
            style={{ width: '100%', minHeight: 160 }}
            value={decodedURL}
          />
        </Grid>
      </Grid>
    </div>
  );
}
