import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import PostCard from '../components/PostCard';

function HomePage() {
  const [posts, setPosts] = useState([
    {
      _id: '1',
      author: { username: 'user1', avatar: '' },
      content: 'This is a sample post content for the news feed.',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([
        {
          _id: Date.now().toString(),
          author: { username: 'CurrentUser', avatar: '' },
          content: newPost,
          createdAt: new Date().toISOString(),
        },
        ...posts,
      ]);
      setNewPost('');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          News Feed
        </Typography>
        <Box sx={{ mb: 3, backgroundColor: '#ffffff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handlePostSubmit} disabled={!newPost.trim()}>
            Post
          </Button>
        </Box>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Suggestions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add more friends to see more posts.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomePage;
