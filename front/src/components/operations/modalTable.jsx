import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import OperationsTable from './operationTable';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

function TableModal({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (open) {
      fetch('http://localhost:81/api/missions/getAll')
        .then(response => response.json())
        .then(data => {
          setRows(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [open, refresh]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:81/api/missions/deleteOperation/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setRows(prevRows => prevRows.filter(row => row.id !== id));
        } else {
          console.error('Failed to delete row:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting row:', error));
  };

  const filteredRows = rows.filter(row => {
    if (!search) {
      return true;
    }
    const searchLower = search.toLowerCase();
    switch (filter) {
      case 'country':
        return row.planeCountry.toLowerCase().includes(searchLower);
      case 'icao':
        return row.planeIcao24.toLowerCase().includes(searchLower);
      case 'id':
        return row.id.toString().toLowerCase().includes(searchLower);
      default:
        return Object.values(row).some(val => val.toString().toLowerCase().includes(searchLower));
    }
  });

  const handleDownloadCSV = () => {
    const csvData = [
      ["ID", "Plane ICAO24", "Plane Registration Country", "Plane Latitude", "Plane Longitude", "Plane Speed", "Threat Latitude", "Threat Longitude", "Threat Radius", "Threat Speed", "Close Time"],
      ...filteredRows.map(row => [
        row.id,
        row.planeIcao24,
        row.planeCountry,
        row.planeLatitude,
        row.planeLongitude,
        row.planeSpeed,
        row.threatLatitude,
        row.threatLongitude,
        row.threatRadius,
        row.threatSpeed,
        row.closeTime
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8,"
      + csvData.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="table-modal-title"
      aria-describedby="table-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            id="table-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: 'grey', filter: 'blur(0.1px)' }}
          >
            Operations
          </Typography>
          <Box>
            <Tooltip title="Download to CSV">
              <IconButton onClick={handleDownloadCSV}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: 16 }}
        />
        <FormControl fullWidth size="small" style={{ marginBottom: 16 }}>
          <InputLabel>Subject</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="What To Search?">
            <MenuItem value="icao">ICAO</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="country">Country</MenuItem>
          </Select>
        </FormControl>
        <OperationsTable rows={filteredRows} onDelete={handleDelete} />
      </Box>
    </Modal>
  );
}

export default TableModal;
