import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: isMobile ? 2 : 0,
          }}
        >
          {/* Main Heading */}
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            SQLiter - Mastering Queries
          </Typography>

          {/* Subheading */}
          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              fontSize: isMobile ? '1rem' : '1.5rem',
              width: isMobile ? '90%' : '70%',
              mb: 4,
            }}
          >
            Crunch Your SQL Queries Faster Than Ever. Writing Queries Has Never Felt Better.
          </Typography>

          {/* Get Started Button */}
          <Link to="/sql-editor" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 3,
                py: 1,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#5E8D90', // Slightly darker teal for hover
                },
              }}
            >
              Get Started
            </Button>
          </Link>

          {/* Key Features Section */}
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 3,
              justifyContent: 'center',
              width: isMobile ? '90%' : '70%',
            }}
          >
            {[
              { title: 'Fast Execution', desc: 'Run queries in milliseconds.' },
              { title: 'Syntax Highlighting', desc: 'Code with clarity.' },
              { title: 'Export Results', desc: 'Save as CSV or JSON.' },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  p: 2,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  textAlign: 'left',
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.primary',
                    fontSize: '1.1rem',
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          py: 3,
          textAlign: 'center',
          bgcolor: 'background.default',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Developed with ❤️ by{' '}
          <a
            href="https://atlan.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="atlan-link"
            style={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Atlan
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/sqliter"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            GitHub
          </a>{' '}
          |{' '}
          <a
            href="https://www.sqltutorial.org/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            SQL Docs
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;