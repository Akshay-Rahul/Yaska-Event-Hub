import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Avatar, Grid, Rating, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import './Feedback2.css';

const FeedbackReceiver = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/feedback')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  return (
    <Container component="main" maxWidth="md" className="feed1-container">
      <CssBaseline />
      <Typography variant="h4" component="h1" className="feed1-title">
        User Feedback
      </Typography>
      <Box className="feed1-grid">
        {feedbacks.map((feedback, index) => (
          feedback.name && feedback.email ? ( // Ensure feedback has necessary properties
            <Card className="feed1-card" key={index}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar className="feed1-avatar">
                      {feedback.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="div" className="feed1-name">
                      {feedback.name}
                    </Typography>
                    <Typography variant="body2" className="feed1-email">
                      {feedback.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" component="p" className="feed1-feedback">
                  {feedback.feedback || 'No feedback provided.'}
                </Typography>
                <Typography variant="body2" className="feed1-location">
                  Location: {feedback.location || 'Unknown'}
                </Typography>
                <Rating
                  name="read-only"
                  value={feedback.rating || 0}
                  readOnly
                  className="feed1-rating"
                />
              </CardContent>
            </Card>
          ) : null
        ))}
      </Box>
    </Container>
  );
};

export default FeedbackReceiver;
