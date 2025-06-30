import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { messageApi } from '../services/api';
import { friendApi } from '../services/api';

function MessagesPage() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await friendApi.getFriends();
        setFriends(response.data);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedFriend) {
        try {
          const response = await messageApi.getMessages(selectedFriend._id);
          setMessages(response.data);
          await messageApi.markMessagesAsRead(selectedFriend._id);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedFriend]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedFriend) {
      try {
        const response = await messageApi.sendMessage(selectedFriend._id, newMessage);
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2, boxShadow: 1, height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>Chats</Typography>
          <List>
            {friends.map(friend => (
              <ListItem
                key={friend._id}
                selected={selectedFriend?._id === friend._id}
                onClick={() => setSelectedFriend(friend)}
                sx={{ cursor: 'pointer', '&.Mui-selected': { backgroundColor: '#e0f2ff' } }}
              >
                <ListItemAvatar>
                  <Avatar src={friend.profile?.avatar || ''} alt={friend.username} />
                </ListItemAvatar>
                <ListItemText primary={friend.username} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2, boxShadow: 1, height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
          {selectedFriend ? (
            <>
              <Typography variant="h6" gutterBottom>Chat with {selectedFriend.username}</Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      maxWidth: '70%',
                      backgroundColor: msg.sender._id === selectedFriend._id ? '#f0f0f0' : '#1e90ff',
                      color: msg.sender._id === selectedFriend._id ? 'text.primary' : '#ffffff',
                      alignSelf: msg.sender._id === selectedFriend._id ? 'flex-start' : 'flex-end',
                      ml: msg.sender._id === selectedFriend._id ? 0 : 'auto',
                      mr: msg.sender._id === selectedFriend._id ? 'auto' : 0,
                    }}
                  >
                    <Typography variant="body2">{msg.content}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" onClick={handleSendMessage} disabled={!newMessage.trim()}>Send</Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 'auto' }}>
              Select a friend to start chatting
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default MessagesPage;
