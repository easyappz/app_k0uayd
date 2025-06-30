import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import { userApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userApi.getProfile();
        setProfile(response.data);
        setFormData({
          firstName: response.data.profile.firstName || '',
          lastName: response.data.profile.lastName || '',
          bio: response.data.profile.bio || '',
          avatar: response.data.profile.avatar || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await userApi.updateProfile(formData);
      setProfile({ ...profile, profile: formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box className="fade-in" sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 3 }}>
          <Avatar src={profile.profile.avatar || ''} alt={profile.username} sx={{ width: 120, height: 120, mb: 2, mx: 'auto', bgcolor: '#1e90ff' }} />
          <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>{profile.username}</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {profile.profile.firstName} {profile.profile.lastName}
          </Typography>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2, borderRadius: 1, transition: 'background-color 0.2s' }} 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className="fade-in" sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Profile Information</Typography>
          {isEditing ? (
            <Box component="form">
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Bio"
                name="bio"
                multiline
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Avatar URL"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  sx={{ borderRadius: 1, transition: 'background-color 0.2s' }}
                >
                  Save
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => setIsEditing(false)}
                  sx={{ borderRadius: 1, transition: 'background-color 0.2s' }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>First Name:</strong> {profile.profile.firstName}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><strong>Last Name:</strong> {profile.profile.lastName}</Typography>
              <Typography variant="body1"><strong>Bio:</strong> {profile.profile.bio}</Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
