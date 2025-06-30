import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { Favorite, Comment, Share } from '@mui/icons-material';

function PostCard({ post }) {
  return (
    <Card sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 1 }}>
      <CardHeader
        avatar={<Avatar src={post.author.avatar || ''} alt={post.author.username} />}
        title={post.author.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Favorite />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
