import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Stack } from '@mui/material';
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';

const ThreatCard = ({ plane, threat,time }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const  handleSave = async() => {
    try {
      const response = await fetch('http://localhost:81/api/missions/saveMission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({plane,threat,time}),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
    setOpen(false);
  };

  return (
    <Stack>
      {open && (
        <Draggable>
          <Card
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 1000,
              border: '2px solid red',
              width: 350,
              backgroundColor: 'black',
              color: 'white',
              backgroundImage: 'url(/path/to/your/alert-background.jpg)', // Add a path to your alert background image
              backgroundSize: 'cover',
              boxShadow: `0 0 10px ${red[500]}`,
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  <WarningIcon sx={{ color: red[500], mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Alert! Danger Zone
                  </Typography>
                </Box>
                <IconButton aria-label="close" onClick={handleClose} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>ICAO24:</strong> {plane.icao24}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Registration Country:</strong> {plane.country}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Last Position:</strong> {plane.lastPosition}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Latitude:</strong> {plane.latitude}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Longitude:</strong> {plane.longitude}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Speed:</strong> {plane.speed}
              </Typography>
              <Box mt={2}>
                <Typography variant="h6" component="div">
                  Threat Details
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Position:</strong> ({threat.position[0]}, {threat.position[1]})
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Radius:</strong> {threat.radius}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Speed:</strong> {threat.speed}
                </Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleSave} size="small" sx={{ backgroundColor: red[500] }}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Draggable>
      )}
    </Stack>
  );
};

export default ThreatCard;
