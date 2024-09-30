import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/weather')
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!weatherData) {
    return <Typography variant="h6">Error loading weather data.</Typography>;
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {weatherData.location}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {weatherData.temperature}
        </Typography>
        <Typography variant="body2">
          {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherComponent;
