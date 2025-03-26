import { createTheme } from '@mui/material/styles';

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#76ABAE', // Muted teal for buttons, links, etc.
      contrastText: '#222831', // Dark grayish-blue for contrast
    },
    secondary: {
      main: '#31363F', // Slightly lighter dark gray for secondary elements
      contrastText: '#EEEEEE', // Light gray for contrast
    },
    background: {
      default: '#222831', // Dark grayish-blue background
      paper: '#31363F', // Slightly lighter dark gray for cards, drawers, etc.
    },
    text: {
      primary: '#EEEEEE', // Light gray for primary text
      secondary: '#76ABAE', // Muted teal for secondary text
    },
    divider: '#76ABAE', // Muted teal for borders
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 'bold',
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 6,
  },
};

const theme = () => createTheme(darkTheme);

export default theme;