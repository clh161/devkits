import { Button, Divider, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spreadsheet } from 'react-spreadsheet';
const useStyles = makeStyles((theme) => {
  return {
    dropzone: {
      '&:hover': {
        background: theme.palette.primary.light,
      },
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        height: theme.spacing(16),
      },
      border: '4px dotted ' + theme.palette.primary.main,
    },
  };
});
type Cell = {
  value: string;
};
const DEFAULT_CSV = [
  new Array(10)
    .fill(0)
    .map((_, i) => 'Column ' + (i + 1))
    .join(','),
  ...new Array(10).fill(0).map((_, i) =>
    new Array(10)
      .fill(0)
      .map((_, j) => 'Value ' + (i * 10 + j + 1))
      .join(',')
  ),
].join('\n');
export default function CSVEditor(): ReactElement {
  const [csv, setCsv] = useState<string>(DEFAULT_CSV);
  const [cells, setCells] = useState<Array<Array<Cell>>>(csvToCells(csv));
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file != null) {
      const reader = new FileReader();

      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
        const newCsv = reader.result?.toString() ?? '';
        setCsv(newCsv);
        setCells(csvToCells(newCsv));
      };

      reader.readAsText(file);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const { ...rootProps } = getRootProps();
  const classes = useStyles();

  function onDownload() {
    const element = document.createElement('a');
    const file = new Blob([csv], {
      type: 'application/csv',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'devkits-csv-editor.csv';
    document.body?.appendChild(element); // Required for this to work in FireFox

    element.click();
  }

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
        <Paper variant='outlined' {...rootProps} className={classes.dropzone}>
          <Grid
            alignContent={'center'}
            container
            item
            justifyContent={'center'}
            xs={12}
          >
            <input {...getInputProps()} />
            <p>Drag and drop a CSV file</p>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <textarea
          onChange={onCsvChange}
          placeholder='CSV'
          style={{
            width: '100%',
            minHeight: 160,
          }}
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
      <Grid item xs={12}>
        <Button color='primary' onClick={onDownload} variant='contained'>
          Download
        </Button>
      </Grid>
    </Grid>
  );
}

function csvToCells(csv: string): Array<Array<Cell>> {
  return csv.split('\n').map((line) =>
    line.split(',').map((value) => {
      return {
        value: value,
      };
    })
  );
}

function cellsToCsv(cells: Array<Array<Cell>>): string {
  return cells
    .map((line) => line.map((cell) => cell.value).join(','))
    .join('\n');
}
