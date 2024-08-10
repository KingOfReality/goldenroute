import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import ThreatComponent from './addThreat';

const OpenModalButton = ({ onAddThreat }) => { 
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Stack direction="column" spacing={2} style={{ marginTop: '20px' }}>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleOpen}
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'primary.main',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            color: 'primary.dark',
          },
        }}
      >
        Add Threat
      </Button>
      <ThreatComponent open={modalOpen} handleClose={handleClose} onAddThreat={onAddThreat} /> 
    </Stack>
  );
};

export default OpenModalButton;
