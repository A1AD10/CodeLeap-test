import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7695EC',
    },
    secondary: {
      main: '#FF5151',
    },
    background: {
      default: '#DDDDDD',
    },
  },
  
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;