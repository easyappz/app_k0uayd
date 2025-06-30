import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserCard({ user, action, onAction }) {
  const navigate = useNavigate();

  return (
    <Card className="fade-in" sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 3px 10px rgba(0,0,0,0.15)' } }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user.profile?.avatar || ''} alt={user.username} sx={{ width: 56, height: 56, mr: 2, bgcolor: '#1e90ff' }} />
        <div>
          <Typography variant="h6" component="div" onClick={() => navigate(`/profile`)} sx={{ cursor: 'pointer', color: '#1e90ff', '&:hover': { textDecoration: 'underline' } }}>
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
            sx={{ 
              backgroundColor: action === 'Request Sent' ? '#e0e0e0' : '#1e90ff', 
              '&:hover': { backgroundColor: action === 'Request Sent' ? '#e0e0e0' : '#1a7ad9' }, 
              transition: 'background-color 0.2s' 
            }}
          >
            {action}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default UserCard;
