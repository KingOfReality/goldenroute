import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Increased width
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3, // Reduced padding
  maxHeight: '80vh',
  overflowY: 'auto',
  borderRadius: 8,
};

const InfoModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-description"
          sx={{
            mt: 0, // Reduced top margin
            mb: 0, // Reduced bottom margin
            lineHeight: 1.4, // Adjust line height for better spacing
            fontSize: 'body1.fontSize', // Adjust font size if necessary
          }}
        >
          Golden Route is an innovative web application designed to enhance airspace safety and awareness. By leveraging the OpenSky API, Golden Route allows users to input coordinates, speed, and a radius to monitor aircraft within the specified area. The site provides real-time alerts and detailed information about the nearest aircraft posing a potential threat. Using advanced vector addition formulas and GeoLib for precise distance calculations, Golden Route dynamically calculates and displays the closest approach time on-screen, eliminating the need for manual submission.
          <br /><br /> 
          Users can see the threat area and aircraft markers visually on a map, making it easy to assess the situation at a glance. Additionally, users can save these alerts for future reference or dismiss them as needed. Saved operations are conveniently accessible through the 'Get Operations' feature in the top bar, which opens a comprehensive table displaying all saved operations. This table includes powerful search and sorting capabilities, and users can also delete operations as necessary. Data can be exported to CSV format for further analysis or record-keeping. With Golden Route, managing and monitoring airspace has never been easier or more efficient.

</Typography>
      </Box>
    </Modal>
  );
};

export default InfoModal;
