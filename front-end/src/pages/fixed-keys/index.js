import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import "./style.css";
// import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import Popup from '../../components/pop-up/Popup';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
// import { height } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';




export default function FixedKeys() {

  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { 
      field: 'is_active',
      headerName: 'Is active',
      width: 200,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          name="is_active"
          inputProps={{ 'aria-label': 'Is active switch' }}
        />
      ),
    },

    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          sx={{ color: "#3d0066" }}
          style={{ cursor: 'pointer' }}
          onClick={() => console.log(`Deleting row ${params.id}`)}
        />
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <div>
          <EditIcon
            onClick={
              () => { setEditPop(true) }
            }
            sx={{ color: "#3d0066" }}
            style={{ cursor: 'pointer' }} />
        </div>
      ),
    },
  ];

  const rows = [
    { id: 1, description: 'Snow', name: 'Jon', },
    { id: 2, description: 'Lannister', name: 'Cersei', },
    { id: 3, description: 'Lannister', name: 'Jaime', },
    { id: 4, description: 'Stark', name: 'Arya', },
    { id: 5, description: 'Targaryen', name: 'Daenerys', },
    { id: 6, description: 'Melisandre', name: null, },
    { id: 7, description: 'Clifford', name: 'Ferrara', },
    { id: 8, description: 'Frances', name: 'Rossini', },
    { id: 9, description: 'Roxie', name: 'Harvey', },
  ];




  return (
    <div className='fixedkeys-container'>
      <div  style={{
          height: 600,
          width: 1000,}} >

        <div className='add-fixedkeys'>
          <Button variant="contained" disableElevation className='add-fixedkeys-btn' onClick={() => { setAddPop(true) }} >
            <AddIcon />
            Add Fixed Keys
          </Button>

        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          className='table-fixedkeys'
          sx={{ border: "1px solid #3d0066", borderRadius: '20px' }}
        />
        {/* </div> */}
      </div>
      {addPop && <Popup close={closePop}>
        <div className='fixedkeys-close-popup' onClick={() => {
          setAddPop(false)
        }}><CloseIcon /></div>
        <Box className='add-fixedkeys-box'
          component="form"
          // sx={{
          //   '& > :not(style)': { m: 1, width: '25ch' },
          // }}
          noValidate
          autoComplete="off"
        >
          <h2>Add Fixed Keys</h2>
          <TextField
            id="outlined-controlled"
            label="Add Fixed Keys"

          />
          <TextField
            id="outlined-uncontrolled"
            label="Add Description"
          />
          <div className='is-active'>
            <h3>Is Active</h3>
          <Switch
          // checked={params.value}
          // name="is_active"
          // inputProps={{ 'aria-label': 'Is active switch' }}
        />
        </div>
          <Button variant="contained" disableElevation style={{ height: 55 }} sx={{ backgroundColor: "#3d0066" }} onClick={() => {
            setAddPop(false)
          }}>
            Submit
          </Button>
        </Box>
      </Popup>
      }
      {editPop && <Popup close={closePop}>
        <div className='fixedkeys-close-popup' onClick={() => {
          setEditPop(false)
        }}><CloseIcon /></div>
        <Box className='add-fixedkeys-box'
          component="form"
          // sx={{
          //   '& > :not(style)': { m: 1, width: '25ch' },
          // }}
          noValidate
          autoComplete="off"
        >
          <h2>Edit Fixed Keys</h2>
          <TextField
            id="outlined-controlled"
            label="Add Fixed Keys"

          />
          <TextField
            id="outlined-uncontrolled"
            label="Add description"
          />
          <Button variant="contained" disableElevation style={{ height: 55 }} onClick={() => {
            setEditPop(false)
          }}>
            Submit
          </Button>
        </Box>
      </Popup>
      }
    </div>

  );
}
