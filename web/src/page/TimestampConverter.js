// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

export default function TimestampConverter(): Node {
  const [unixTimestamp, setUnixTimestamp] = useState(
    parseInt(Date.now() / 1000)
  );
  const [datetime, setDatetime] = useState(
    unixToDate(parseInt(Date.now() / 1000))
  );

  function onUnixTimestampChange(event) {
    const { value } = event.target;
    setUnixTimestamp(value);
    setDatetime(unixToDate(Number(value)));
  }

  function onDatetimeChange(name, event) {
    const { value } = event.target;
    setDatetime(
      datetime.map((dt) => {
        if (name === dt.name) {
          dt.value = value;
        }
        return dt;
      })
    );
    const datestamp =
      new Date(
        Date.UTC(
          ...datetime.map((dt) => {
            if (dt.name === 'Month') {
              return dt.value - 1;
            }
            return dt.value;
          })
        )
      ).getTime() / 1000;
    setUnixTimestamp(datestamp);
  }

  return (
    <div>
      <Helmet>
        <title>Unix Timestamp Convertor (UTC)</title>
      </Helmet>
      <Typography variant="h4" component="h1">
        Unix Timestamp Convertor (UTC)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            type="number"
            value={unixTimestamp}
            onChange={onUnixTimestampChange}
            label="Timestamp"
          />
        </Grid>
        {datetime.map((dt: string) => {
          return (
            <Grid key={dt.name} item xs={2}>
              <TextField
                type="number"
                label={dt.name}
                value={dt.value}
                onChange={(event) => {
                  onDatetimeChange(dt.name, event);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function unixToDate(timestamp) {
  const date = new Date(timestamp * 1000);

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
