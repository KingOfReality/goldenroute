import React, { useState } from 'react';
import { TextField, Stack } from '@mui/material';
import { styled } from '@mui/system';

const RoundedTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '20px',
  },
  '& .MuiInputBase-input': {
    padding: '10px',
  },
  '& .MuiFormHelperText-root': {
    margin: '4px 0 0',
  },
});

const ThreatInput = ({ onAddThreat }) => {
  const [formValues, setFormValues] = useState({
    position: '',
    speed: '',
    radius: ''
  });
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let tempErrors = {};
    let isValid = true;

    const positionRegex = /^-?\d{1,2}\.\d+,\s*-?\d{1,3}\.\d+$/;
    if (!positionRegex.test(values.position)) {
      tempErrors.position = 'Position must be in "latitude, longitude" format.';
      isValid = false;
    }

    if (!Number.isFinite(Number(values.speed)) || Number(values.speed) <= 0) {
      tempErrors.speed = 'Speed must be a positive integer.';
      isValid = false;
    }

    if (!Number.isFinite(Number(values.radius)) || Number(values.radius) <= 0) {
      tempErrors.radius = 'Radius must be a positive integer.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      const isValid = validate(newValues);

      if (isValid) {
        const newThreat = {
          position: newValues.position.split(',').map(coord => parseFloat(coord.trim())),
          popupText: `Alert at ${newValues.position}`,
          radius: parseInt(newValues.radius),
          speed: parseInt(newValues.speed)
        };

        onAddThreat(newThreat);
      }

      return newValues;
    });
  };

  return (
    <Stack direction="row" spacing={2} style={{ marginTop: '20px' }}>
      <RoundedTextField
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
        variant="outlined"
        size="small"
      />
      <RoundedTextField
        margin="dense"
        name="speed"
        label="Speed(km/h)"
        type="number"
        fullWidth
        value={formValues.speed}
        onChange={handleChange}
        error={!!errors.speed}
        helperText={errors.speed}
        variant="outlined"
        size="small"
      />
      <RoundedTextField
        margin="dense"
        name="radius"
        label="Radius(km)"
        type="number"
        fullWidth
        value={formValues.radius}
        onChange={handleChange}
        error={!!errors.radius}
        helperText={errors.radius}
        variant="outlined"
        size="small"
      />
    </Stack>
  );
};

export default ThreatInput;
