import React from "react";
import { List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Sidebar container styles
const SidebarContainer = styled("div")(({ theme }) => ({
  width: 240,
  height: "calc(100vh - 64px)",
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
  overflowY: "auto",
}));

// Section title styles
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));



function Sidebar({ onQuerySelect, availableQueries, queryHistory }) {
  return (
    <SidebarContainer>
      <div>
        <SectionTitle>Available Queries</SectionTitle>
        <List>
          {availableQueries.map((item, index) => (
            <ListItem
              button
              key={item.title}
              onClick={() => onQuerySelect(index, 'available')}
              sx={{
                cursor: 'pointer',
                "&:hover": {
                  backgroundColor: 'secondary.main',
                  "& .MuiListItemText-primary": {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ bgcolor: 'divider' }} />

        <SectionTitle>Query History</SectionTitle>
        <List>
          {queryHistory.length > 0 ? (
            queryHistory.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => onQuerySelect(index, 'history')}
                sx={{
                  cursor: 'pointer',
                  "&:hover": {
                    backgroundColor: 'secondary.main',
                    "& .MuiListItemText-primary": {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.query.length > 30 ? `${item.query.substring(0, 30)}...` : item.query}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No recent queries" />
            </ListItem>
          )}
        </List>
      </div>

      <div>
        <SectionTitle>Documentation</SectionTitle>
        <List>
          <ListItem
            button
            onClick={() => window.open("https://www.sqltutorial.org/", "_blank")}
            sx={{
              cursor: 'pointer',
              "&:hover": {
                backgroundColor: 'secondary.main',
                "& .MuiListItemText-primary": {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemText primary="SQL Reference" />
          </ListItem>
        </List>
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;