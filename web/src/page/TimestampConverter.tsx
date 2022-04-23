import { Grid, TextField } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
type DatetimeConfig = {
  name: string;
  value: number;
};
type Props = {
  initTimestamp?: number;
};
export default function TimestampConverter({
  initTimestamp,
}: Props): ReactElement {
  const [unixTimestamp, setUnixTimestamp] = useState(
    parseInt(initTimestamp?.toString() ?? (Date.now() / 1000).toString())
  );
  const [datetime, setDatetime] = useState(
    unixToDate(parseInt(unixTimestamp.toString()))
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
    const time = datetime.map((dt) => {
      if (dt.name === 'Month') {
        return dt.value - 1;
      }

      return dt.value;
    });

    const datestamp =
      new Date(
        Date.UTC(time[0], time[1], time[2], time[3], time[4], time[5])
      ).getTime() / 1000;
    setUnixTimestamp(datestamp);
  }

  return (
    <Grid container spacing={3}>
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
  );
}
export function unixToDate(timestamp: number): Array<DatetimeConfig> {
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
