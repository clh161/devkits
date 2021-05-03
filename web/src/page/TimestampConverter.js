// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

export default function TimestampConverter(): Node {
  const [unixTimestamp, setUnixTimestamp] = useState(Date.now());
  const [datetime, setDatetime] = useState(unixToDate(Date.now()));

  function onUnixTimestampChange(event) {
    const { value } = event.target;
    setUnixTimestamp(value);
    setDatetime(unixToDate(Number(value)));
  }

  return (
    <div>
      <Helmet>
        <title>Unix Timestamp Convertor</title>
      </Helmet>
      <Typography variant="h4" component="h1">
        Unix Timestamp Convertor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={unixTimestamp}
            onChange={onUnixTimestampChange}
            label="Timestamp"
          />
        </Grid>
        {datetime.map((dt: string) => {
          return (
            <Grid key={dt.name} item xs={2}>
              <TextField label={dt.name} value={dt.value} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function unixToDate(timestamp) {
  console.log(timestamp);
  const date = new Date(timestamp);

  return [
    {
      name: 'Year',
      value: date.getUTCFullYear(),
    },
    {
      name: 'Month',
      value: date.getUTCMonth() + 1,
    },
    {
      name: 'Day',
      value: date.getDate(),
    },
    {
      name: 'Hour',
      value: date.getUTCHours(),
    },
    {
      name: 'Minute',
      value: date.getUTCMinutes(),
    },
    {
      name: 'Second',
      value: date.getUTCSeconds(),
    },
  ];
}
