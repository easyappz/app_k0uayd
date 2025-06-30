import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UserCard from '../components/UserCard';
import { friendApi } from '../services/api';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsResponse = await friendApi.getFriends();
        const requestsResponse = await friendApi.getFriendRequests();
        setFriends(friendsResponse.data);
        setFriendRequests(requestsResponse.data);
      } catch (error) {
        console.error('Failed to fetch friends data:', error);
      }
    };

    fetchFriendsData();
  }, []);

  const handleAcceptRequest = async (userId) => {
    try {
      await friendApi.acceptFriendRequest(userId);
      setFriendRequests(friendRequests.filter(req => req._id !== userId));
      const acceptedUser = friendRequests.find(req => req._id === userId);
      setFriends([...friends, acceptedUser]);
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      await friendApi.rejectFriendRequest(userId);
      setFriendRequests(friendRequests.filter(req => req._id !== userId));
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Friends ({friends.length})</Typography>
          {friends.length > 0 ? (
            friends.map(friend => (
              <UserCard key={friend._id} user={friend} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">You have no friends yet.</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: 1, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Friend Requests ({friendRequests.length})</Typography>
          {friendRequests.length > 0 ? (
            friendRequests.map(request => (
              <UserCard
                key={request._id}
                user={request}
                action="Accept"
                onAction={handleAcceptRequest}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">You have no pending friend requests.</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default FriendsPage;
