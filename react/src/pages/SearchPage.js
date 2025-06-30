import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import UserCard from '../components/UserCard';
import { userApi, friendApi } from '../services/api';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await userApi.searchUsers(searchQuery);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Failed to search users:', error);
      }
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      await friendApi.sendFriendRequest(userId);
      setSearchResults(searchResults.map(user => 
        user._id === userId ? { ...user, friendRequestSent: true } : user
      ));
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Search Users</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter username or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch} disabled={!searchQuery.trim()}>
              Search
            </Button>
          </Box>
          {searchResults.length > 0 ? (
            searchResults.map(user => (
              <UserCard
                key={user._id}
                user={user}
                action={user.friendRequestSent ? 'Request Sent' : 'Add Friend'}
                onAction={handleSendFriendRequest}
              />
            ))
          ) : searchQuery.trim() === '' ? (
            <Typography variant="body2" color="text.secondary">Type something to search for users.</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">No users found.</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchPage;
