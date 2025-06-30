import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar } from '@mui/material';
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
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 500 }} onClick={() => navigate('/')}>
          SocialNet
        </Typography>
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/messages')} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
              <Badge badgeContent={unreadCount} color="error">
                <Message />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
              <Notifications />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {currentUser.username}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ cursor: 'pointer', color: '#fff', opacity: 0.8, '&:hover': { opacity: 1 } }} onClick={handleLogout}>
              Logout
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
