import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useProfile } from '../hooks/useProfile';

const Profile: React.FC = () => {
  const { user, loading, error } = useProfile();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error || 'User not found'}</Typography>
      </Box>
    );
  }

  const postId = user.id + 12345677; // Adjusting postId to start from 12345678

  return (
    <Box p={3}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Welcome {user.name}
      </Button>

      <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                User ID
              </Typography>
              <Typography variant="body1" gutterBottom>
                {postId}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.phone}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                Address
              </Typography>
              <Typography variant="body1" gutterBottom>
                {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;