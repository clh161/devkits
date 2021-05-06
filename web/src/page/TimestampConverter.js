// @flow strict
import type { Node } from 'react';
import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

type DatetimeConfig = {
  name: string,
  value: number,
};

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
        <meta
          content="unix timestamp and date time converter"
          name="description"
        />
        <meta content="timestamp, epoch, converter" name="keywords" />
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Unix Timestamp Convertor (UTC)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Timestamp"
            onChange={onUnixTimestampChange}
            type="number"
            value={unixTimestamp}
          />
        </Grid>
        {datetime.map((dt: DatetimeConfig) => {
          return (
            <Grid item key={dt.name} xs={2}>
              <TextField
                label={dt.name}
                onChange={(event) => {
                  onDatetimeChange(dt.name, event);
                }}
                type="number"
                value={dt.value}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function unixToDate(timestamp): Array<DatetimeConfig> {
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
