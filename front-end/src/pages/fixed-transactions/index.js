import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';

function FixedTransactions() {
  const [rows, setRows] = useState([
    { id: 1, name: "Item 1", price: "$5.00", checked: false },
    { id: 2, name: "Item 2", price: "$10.00", checked: false },
    { id: 3, name: "Item 3", price: "$10.00", checked: false },
  ]);

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleCheck = (id) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, checked: !row.checked };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleView = (id) => {
    const item = rows.find((row) => row.id === id);
    alert(`Viewing ${item.name} - ${item.price}`);
  };

  const handleNext = () => {
    const selectedItems = rows.filter((row) => row.checked);
    alert(`Moving to next page with ${selectedItems.length} items`);
  };

  return (
    <Grid xs = {9}>
    <TableContainer  sx={{width : "100%" , height : '95vh'  , alignContent: "center" , margin:'20px 20px 20px 20px' ,borderRadius:"20px"  } }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Checklist</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={row.checked}
                      onChange={() => handleCheck(row.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(row.id)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button variant="contained" onClick={handleNext} disabled={!rows.some((row) => row.checked)}>Next</Button>
          </Box>
        </TableContainer>
      </Grid>
  );
}

export default FixedTransactions;
