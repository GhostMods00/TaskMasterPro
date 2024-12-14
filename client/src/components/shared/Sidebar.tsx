// src/components/shared/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px'
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/projects')}>
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;