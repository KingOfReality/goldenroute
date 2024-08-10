import './App.css';
import MapComponent from './components/mapCom';
import { Stack, Box, Button } from '@mui/material';
import TopBar from './components/topBar/topBar';
import TableModal from './components/operations/modalTable';
import './App.css'; 
import React from 'react';
import { useState }  from 'react';
import DangerAlert from './components/timeClose';
function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Box position="fixed" top={0} left={0} right={0} zIndex={1100}>
        <TopBar />
      </Box>
      <Box mt={8} mb={8}>
        <MapComponent />
      </Box>
    </Stack>
  );
}

export default App;
