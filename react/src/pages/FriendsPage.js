import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import UserCard from '../components/UserCard';
import { friendApi } from '../services/api';

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsResponse = await friendApi.getFriends();
        const requestsResponse = await friendApi.getFriendRequests();
        setFriends(friendsResponse.data);
        setFriendRequests(requestsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch friends data:', error);
        setLoading(false);
      }
    };

    fetchFriendsData();
  }, []);

  const handleAcceptRequest = async (userId) => {
    try {
      await friendApi.acceptFriendRequest(userId);
      const acceptedUser = friendRequests.find(req => req._id === userId);
      setFriendRequests(friendRequests.filter(req => req._id !== userId));
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

  const handleMessageFriend = (userId) => {
    navigate(`/messages?friendId=${userId}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box className="fade-in" sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Friends ({friends.length})</Typography>
          {friends.length > 0 ? (
            friends.map(friend => (
              <Box key={friend._id} sx={{ mb: 2 }}>
                <UserCard
                  user={friend}
                  action="Message"
                  onAction={() => handleMessageFriend(friend._id)}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">You have no friends yet. Find some on the Search page!</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className="fade-in" sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Friend Requests ({friendRequests.length})</Typography>
          {friendRequests.length > 0 ? (
            friendRequests.map(request => (
              <Box key={request._id} sx={{ mb: 2 }}>
                <UserCard
                  user={request}
                  action="Accept"
                  onAction={handleAcceptRequest}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, ml: 2, borderRadius: 1, transition: 'background-color 0.2s' }}
                  onClick={() => handleRejectRequest(request._id)}
                >
                  Reject
                </Button>
              </Box>
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
