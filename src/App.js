import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';
import './styles/global.css';

function App() {
  const appliedTheme = theme(); // Call the theme function to get the theme object

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;