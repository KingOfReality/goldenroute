import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dangerAlertContainer: {
    position: 'fixed',
    top: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
  },
  dangerAlert: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '300px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '40px',
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
    animation: '$blinker 1.5s linear infinite',
  },
  timer: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  '@keyframes blinker': {
    '50%': {
      opacity: 0,
    },
  },
}));

const DangerAlert = ({ hours = 30 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.dangerAlertContainer}>
      <Paper className={classes.dangerAlert}>
        <Typography variant="h2" className={classes.timer}>
          {hours}h
        </Typography>
      </Paper>
    </Box>
  );
};

export default DangerAlert;
