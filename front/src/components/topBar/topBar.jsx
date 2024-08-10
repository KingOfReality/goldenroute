import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button,Box,Switch,IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import TableModal from '../operations/modalTable';
import InfoModal from '../info';
const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [infoOpen,setInfoOpen] = useState(false)

  const handleOpenInfo = () => setInfoOpen(true)
  const handleCloseInfo = () => setInfoOpen(false)
  const handleOpenTable = () => setOpen(true);
  const handleCloseTable = () => setOpen(false);
  return (
    <AppBar position="relative" sx={{ top: 0, width: '100%', backgroundColor: 'black'  }} >
      <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            GOLDEN ROUTE
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> 
          <Button
            onClick={handleOpenTable}
            sx={{
              color: 'white',
              borderRadius:'15px',
              backgroundColor: theme => alpha(theme.palette.background.paper, 0.2),
              '&:hover': {
                backgroundColor: theme => alpha(theme.palette.background.paper, 0.4)
              }
            }}
          >
            Get Operations
          </Button>  
          <Box sx={{flexGrow:0.02 }}></Box>
          <IconButton
          onClick={handleOpenInfo}
      sx={{
        color: 'black',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0, 
      }}
    >
      <Typography
        sx={{
          fontSize: '24px', 
          fontWeight: 'bold',
        }}
      >
        ?
      </Typography>
    </IconButton>
        </Toolbar>
        <TableModal open={open} onClose={handleCloseTable} />
        <InfoModal open={infoOpen} handleClose={handleCloseInfo}/>
    </AppBar>
  );
};

export default TopBar;
