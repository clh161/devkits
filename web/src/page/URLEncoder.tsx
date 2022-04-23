import { Divider, Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
const DEFAULT_URL =
  'https://devkits.net/json=%7B%0A%20%20%22user%22:%20%7B%0A%20%20%20%20%22id%22:%201,%0A%20%20%20%20%22name%22:%20%22devkits%22%0A%20%20%7D%0A%7D%0A';
const DECODED_URL = decodeURIComponent(DEFAULT_URL);
export default function URLEncoder(): ReactElement {
  const [encodedURL, setEncodedURL] = useState<string>(DEFAULT_URL);
  const [decodedURL, setDecodedURL] = useState<string>(DECODED_URL);

  function onEncodedURLChange(event) {
    const { value } = event.target;
    setEncodedURL(value);

    try {
      setDecodedURL(decodeURIComponent(value));
    } catch (_) {
      setDecodedURL(value);
    }
  }

  function onDecodedURLChange(event) {
    const { value } = event.target;
    setDecodedURL(value);
    setEncodedURL(encodeURIComponent(value));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <textarea
          onChange={onEncodedURLChange}
          placeholder="Encoded URL"
          style={{
            width: '100%',
            minHeight: 160,
          }}
          value={encodedURL}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <textarea
          onChange={onDecodedURLChange}
          placeholder="Decoded URL"
          style={{
            width: '100%',
            minHeight: 160,
          }}
          value={decodedURL}
        />
      </Grid>
    </Grid>
  );
}
