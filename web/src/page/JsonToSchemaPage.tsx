import { Alert, Button, Stack, TextField } from '@mui/material';
import JSZip from 'jszip';
import React, { ReactElement, useEffect, useState } from 'react';

import { getKotlinClass, KotlinClass } from '../json-converter/JsonToKotlin';

const DEFAULT_JSON = JSON.stringify(
  {
    purchases: [
      {
        id: 1,
        products: [
          {
            id: 100,
            name: 'Phone',
            price: 99.9,
            manufacturer: 'Orange',
          },
          {
            id: 100,
            name: 'Phone',
            price: 18.5,
          },
        ],
        couponCodes: [
          {
            name: 'Discount-2023',
          },
        ],
      },
    ],
  },
  null,
  4
);

export default function JsonToSchemaPage(): ReactElement {
  const [json, setJson] = useState<string>(DEFAULT_JSON);
  const jsonParsingError = getJsonPrasingError(json);
  const [lastValidJson, setLastValidJson] = useState<string>(DEFAULT_JSON);

  useEffect(() => {
    if (jsonParsingError == null) {
      setLastValidJson(json);
    }
  }, [json]);

  const kotlinClasses = getKotlinClass(JSON.parse(lastValidJson), 'root');
  return (
    <Stack spacing={2}>
      <TextField
        label='Json schema'
        maxRows={15}
        minRows={5}
        multiline
        onChange={(event) => {
          const { value } = event.target;
          setJson(value);
        }}
        placeholder='Json schema'
        style={{
          width: '100%',
        }}
        value={json}
      />
      {jsonParsingError != null && (
        <Alert color='error'>{jsonParsingError}</Alert>
      )}
      <Button
        onClick={() => {
          onDownload(kotlinClasses);
        }}
        variant='contained'
      >
        Download
      </Button>
      {kotlinClasses.map((kotlinClass) => {
        const path = kotlinClass.path.join(' > ');
        return (
          <TextField
            key={path}
            label={path}
            maxRows={15}
            minRows={5}
            multiline
            placeholder={path}
            style={{
              width: '100%',
            }}
            value={kotlinClass.string}
          />
        );
      })}
    </Stack>
  );
}

function getJsonPrasingError(json: string): string | null {
  try {
    JSON.parse(json);
  } catch (e) {
    return e.message;
  }
  return null;
}

function onDownload(kotlinClasses: KotlinClass[]) {
  const zip = new JSZip();
  for (const kotlinClass of kotlinClasses) {
    zip.file(kotlinClass.className + '.kt', kotlinClass.string);
  }

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    const element = document.createElement('a');

    element.href = URL.createObjectURL(content);
    element.download = 'kotlin.zip';
    document.body?.appendChild(element); // Required for this to work in FireFox

    element.click();
  });
}
