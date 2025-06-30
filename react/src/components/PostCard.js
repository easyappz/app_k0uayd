import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { Favorite, Comment, Share } from '@mui/icons-material';

function PostCard({ post }) {
  return (
    <Card className="fade-in" sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 3px 10px rgba(0,0,0,0.15)' } }}>
      <CardHeader
        avatar={<Avatar src={post.author.avatar || ''} alt={post.author.username} sx={{ bgcolor: '#1e90ff' }} />}
        title={post.author.username}
        subheader={new Date(post.createdAt).toLocaleString()}
        titleTypographyProps={{ fontWeight: 500 }}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" sx={{ color: '#666', '&:hover': { color: '#e91e63' }, transition: 'color 0.2s' }}>
          <Favorite />
        </IconButton>
        <IconButton aria-label="comment" sx={{ color: '#666', '&:hover': { color: '#1e90ff' }, transition: 'color 0.2s' }}>
          <Comment />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: '#666', '&:hover': { color: '#4caf50' }, transition: 'color 0.2s' }}>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
