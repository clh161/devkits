import '@fontsource/roboto';

import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});
export default theme;
