import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OperationsTable = ({ rows, onDelete }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy) {
      if (order === 'asc') {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    }
    return 0;
  });

  return (
    <Box position="relative">
      <TableContainer component={Paper} style={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Delete</TableCell>
              {['id', 'planeIcao24', 'planeRegistrationCountry', 'planeLatitude', 'planeLongitude', 'planeSpeed', 'threatLatitude', 'threatLongitude', 'threatRadius', 'threatSpeed', 'closeTime'].map(column => (
                <TableCell
                  key={column}
                  align="center"
                  sortDirection={orderBy === column ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleRequestSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id} sx={{ '& td': { padding: '4px' } }}>
                <TableCell align="center">
                  <IconButton onClick={() => onDelete(row.id)} size="small" color="secondary">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.planeIcao24}</TableCell>
                <TableCell align="center">{row.planeCountry}</TableCell>
                <TableCell align="center">{row.planeLatitude}</TableCell>
                <TableCell align="center">{row.planeLongitude}</TableCell>
                <TableCell align="center">{row.planeSpeed}</TableCell>
                <TableCell align="center">{row.threatLatitude}</TableCell>
                <TableCell align="center">{row.threatLongitude}</TableCell>
                <TableCell align="center">{row.threatRadius}</TableCell>
                <TableCell align="center">{row.threatSpeed}</TableCell>
                <TableCell align="center">{row.closeTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OperationsTable;
