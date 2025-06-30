import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from '@mui/material';
import { Message, Notifications } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { messageApi } from '../services/api';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await messageApi.getUnreadMessageCount();
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch unread message count:', error);
      }
    };

    if (currentUser) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          SocialNet
        </Typography>
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => navigate('/messages')}>
              <Badge badgeContent={unreadCount} color="error">
                <Message />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 2, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              {currentUser.username}
            </Typography>
            <Typography variant="body2" sx={{ ml: 2, cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
