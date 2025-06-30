import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
