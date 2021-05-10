// @flow strict
import type { Node } from 'react';
import React, { useState } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Spreadsheet } from 'react-spreadsheet';

type Cell = {
  value: string,
};

const DEFAULT_CSV = [
  new Array(10)
    .fill()
    .map((_, i) => 'Column ' + (i + 1))
    .join(','),

  ...new Array(10).fill().map((_, i) =>
    new Array(10)
      .fill()
      .map((_, j) => 'Value ' + (i * 10 + j + 1))
      .join(',')
  ),
].join('\n');

export default function CSVEditor(): Node {
  const [decodedHTMLText, setDecodedHTMLText] = useState<string>(DEFAULT_CSV);

  const data = csvToCells(decodedHTMLText);

  // function onEncodedHTMLChanged(event) {
  //   const { value } = event.target;
  //   setEncodedHTMLText(value);
  //   setDecodedHTMLText(decode(value));
  // }
  function onDecodedHTMLChanged(event) {
    const { value } = event.target;
    setDecodedHTMLText(value);
    // setEncodedHTMLText(encode(value));
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
          <Spreadsheet data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

function csvToCells(csv: string): Array<Array<Cell>> {
  return csv.split('\n').map((line) =>
    line.split(',').map((value) => {
      return { value: value };
    })
  );
}
