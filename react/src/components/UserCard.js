import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserCard({ user, action, onAction }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user.profile?.avatar || ''} alt={user.username} sx={{ width: 56, height: 56, mr: 2 }} />
        <div>
          <Typography variant="h6" component="div" onClick={() => navigate(`/profile`)} sx={{ cursor: 'pointer' }}>
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.profile?.firstName || ''} {user.profile?.lastName || ''}
          </Typography>
        </div>
      </CardContent>
      {action && (
        <CardActions>
          <Button 
            size="small" 
            variant="contained" 
            onClick={() => onAction(user._id)}
            disabled={action === 'Request Sent'}
          >
            {action}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default UserCard;
