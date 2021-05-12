// @flow strict
import { Divider, Grid } from '@material-ui/core';
import type { Node } from 'react';
import React, { useState } from 'react';
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
  const [csv, setCsv] = useState<string>(DEFAULT_CSV);
  const [cells, setCells] = useState<Array<Array<Cell>>>(csvToCells(csv));

  function onCsvChange(event) {
    const { value } = event.target;
    setCsv(value);
    setCells(csvToCells(value));
  }

  function onCellsChange(cells: Array<Array<Cell>>) {
    setCells(cells);
    setCsv(cellsToCsv(cells));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <textarea
          onChange={onCsvChange}
          placeholder="CSV"
          style={{ width: '100%', minHeight: 160 }}
          value={csv}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Spreadsheet
          data={cells}
          onChange={(cells) => {
            onCellsChange(cells);
          }}
        />
      </Grid>
    </Grid>
  );
}

function csvToCells(csv: string): Array<Array<Cell>> {
  return csv.split('\n').map((line) =>
    line.split(',').map((value) => {
      return { value: value };
    })
  );
}

function cellsToCsv(cells: Array<Array<Cell>>): string {
  return cells
    .map((line) => line.map((cell) => cell.value).join(','))
    .join('\n');
}
