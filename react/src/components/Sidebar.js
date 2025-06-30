import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Person, People, Message, Search } from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Friends', icon: <People />, path: '/friends' },
    { text: 'Messages', icon: <Message />, path: '/messages' },
    { text: 'Search', icon: <Search />, path: '/search' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#333',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e0f2ff',
                  color: '#1e90ff',
                },
                '&:hover': {
                  backgroundColor: '#f0f7ff',
                },
              }}
            >
              <ListItemIcon>
                {React.cloneElement(item.icon, { color: location.pathname === item.path ? 'primary' : 'inherit' })}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default Sidebar;
