import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ThreatComponent = ({ open, handleClose, onAddThreat }) => { // Accept onAddThreat as a prop
  const [formValues, setFormValues] = useState({
    position: '',
    speed: '',
    Radius: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};

    const positionRegex = /^-?\d{1,2}\.\d+,\s*-?\d{1,3}\.\d+$/;
    if (!positionRegex.test(formValues.position)) {
      tempErrors.position = 'Position must be in "latitude, longitude" format.';
    }

    if (!Number.isInteger(Number(formValues.speed)) || Number(formValues.speed) <= 0) {
      tempErrors.speed = 'Speed must be a positive integer.';
    }

    if (!Number.isInteger(Number(formValues.Radius)) || Number(formValues.Radius) <= 0) {
      tempErrors.Radius = 'Radius must be a positive integer.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newThreat = {
        position: formValues.position.split(',').map(coord => parseFloat(coord.trim())),
        popupText: `Alert at ${formValues.position}`,
        radius: parseInt(formValues.Radius),
        speed: parseInt(formValues.speed)
      };

      onAddThreat(newThreat);

      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modal with Inputs</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="position"
          label="Position (lat,lng)"
          type="text"
          fullWidth
          value={formValues.position}
          onChange={handleChange}
          error={!!errors.position}
          helperText={errors.position}
        />
        <TextField
          margin="dense"
          name="speed"
          label="Speed"
          type="number"
          fullWidth
          value={formValues.speed}
          onChange={handleChange}
          error={!!errors.speed}
          helperText={errors.speed}
        />
        <TextField
          margin="dense"
          name="Radius"
          label="Radius"
          type="number"
          fullWidth
          value={formValues.Radius}
          onChange={handleChange}
          error={!!errors.Radius}
          helperText={errors.Radius}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThreatComponent;
