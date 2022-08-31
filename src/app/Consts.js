import { createTheme, ThemeProvider } from '@mui/material/styles';

export const URLMAIN_STATIC = "";
export const URLMAIN_API = "";

export const theme = createTheme({
  palette: {
    // mode:"dark",
    primary: {
      main: '#2f524e',
    },
    background: {
      paper: '#e8e8de',
      default: '#e8e8de',
    },
    secondary: {
      main: '#2f524e',
    },
    info: {
      main: '#48808f',
    },
  },
});