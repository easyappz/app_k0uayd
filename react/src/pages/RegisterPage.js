import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, Paper, Alert } from '@mui/material';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '', server: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '', server: '' };

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: '', email: '', password: '', server: '' });

    if (!validateForm()) {
      return;
    }

    try {
      const response = await authApi.register({ username, email, password });
      register(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setErrors({ ...errors, server: err.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
      <Paper className="fade-in" sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 500, color: '#1e90ff' }}>
          Sign Up
        </Typography>
        {errors.server && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {errors.server}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ backgroundColor: '#f5f5f5', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 1, transition: 'background-color 0.2s' }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button variant="text" onClick={() => navigate('/login')} sx={{ color: '#1e90ff', '&:hover': { textDecoration: 'underline' } }}>
              Sign In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
