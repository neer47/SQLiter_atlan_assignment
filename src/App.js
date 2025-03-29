import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  const appliedTheme = theme(); // Call the theme function to get the theme object

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Navbar/>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;