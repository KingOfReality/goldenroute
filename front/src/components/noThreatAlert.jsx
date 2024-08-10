import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Toast = ({ open, message, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success" 
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
