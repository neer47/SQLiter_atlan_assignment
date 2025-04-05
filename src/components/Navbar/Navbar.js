import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'SQL Editor', path: '/sql-editor' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <List sx={{ width: 250, bgcolor: 'background.paper', color: 'text.primary' }}>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.label}
          onClick={() => {
            navigate(item.path);
            setDrawerOpen(false);
          }}
          sx={{
            py: 1.5,
            '&:hover': {
              bgcolor: 'secondary.main',
              '& .MuiListItemText-primary': {
                color: 'primary.main',
              },
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                fontWeight="medium"
                color={location.pathname === item.path ? 'primary.main' : 'text.primary'}
              >
                {item.label}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1300,
          backgroundColor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={() => navigate('/')}
          >
            SQLiter
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: 'medium',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'secondary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Navbar;