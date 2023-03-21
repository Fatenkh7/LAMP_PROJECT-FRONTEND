import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";
import { Box } from '@mui/material';
import Popup from '../../components/pop-up/Popup';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookie from "js-cookie";
import Loding from "../../components/loding/Loding";


export default function FixedKeys() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [getFixedKey , setGetFixedKey] = useState(null);
  const [fixedKey, setFixedKey] = useState({
    name: "",
    description: "",
    is_active: false,
  });  
  const [submitEdit, setSubmitEdit] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [nameInput,setNameInput]=useState("");
  const [descriptionInput,setDescriptionInput]=useState("");
  const [isActive,setIsactive]=useState(false);
  



  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

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
          checked={params.value === 1 ? true : false}
          name="is_active"
          inputProps={{ "aria-label": "Is active switch" }}
        />
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          sx={{ color: "#3d0066" }}
          style={{ cursor: 'pointer' }}
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <div>
          <EditIcon
            onClick={
              () => { setEditPop(true);setSubmitEdit(params.row.id);}
            }

            sx={{ color: "#3d0066" }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
  const getData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get("http://localhost:8000/api/fixedkey" , config)
      setGetFixedKey(response.data.message);
      console.log(response.data.message)

    } catch (e) {
      console.log(e)
    }
  };   getData();
}, [])

  const handleDelete = async (id) => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3d0066",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/fixedkey/${id}`,config);
          setFixedKey(fixedKey.filter((fixedKey) => fixedKey.id !== id));
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });    
  };
  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  };
  const handleDescriptionInputChange = (event) => {
    setDescriptionInput(event.target.value);
  };
  const handleIsActiveChange = (event) => {
    setIsactive(event.target.checked);
  };
  const handleSubmit = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/fixedkey", {
        name: nameInput,
        description: descriptionInput,
        is_active:isActive,
      },config);
      setFixedKey([...fixedKey, response.data.message.data]);
      setAddPop(false);
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };  
  const handleEditPopupSubmit = async () => {
    const newFixedKey = { name: nameInput, description: descriptionInput , is_active: isActive};
    setSubmitEdit(newFixedKey);
    setNameInput("");
    setDescriptionInput("");
    // isActive(false);
    setEditPop(false);
    try {
      await handleEdit(submitEdit);
      Swal.fire({
        icon: "success",
        title: "Update Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  
  const handleEdit = async (id) => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/fixedkey/${id}`,
        {  name: nameInput, description: descriptionInput , is_active:isActive }
      ,config);
      const updatedFixedKey = response.data;
      const updatedData = fixedKey.map((fixedKey) =>
        fixedKey.id === updatedFixedKey.id ? updatedFixedKey : fixedKey
      );
      setFixedKey(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  

  if (!getFixedKey) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          alignItems: "center",
        }}
      >
        <Loding />
      </div>
    );
  }
  
  return (
    <div className='fixedkeys-container'>
      <div style={{
        height: 600,
        width: 1000,
      }} >
        <div className='add-fixedkeys'>
          <Button variant="contained" disableElevation className='add-fixedkeys-btn' onClick={() => { setAddPop(true) }} >
            <AddIcon />
            Add Fixed Keys
          </Button>
        </div>
        <DataGrid
          rows={getFixedKey}
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
            label="Add Name"
            onChange={handleNameInputChange}
          />
          <TextField
            id="outlined-uncontrolled"
            label="Add Description"
            onChange={handleDescriptionInputChange}
          />
          <div className='is-active'>
            <h3>Is Active</h3>
            <Switch
             id="outlined-uncontrolled"
             label="is active"
             onChange={handleIsActiveChange}
            // checked={setIsactive(1)}
            // name="is_active"
            // inputProps={{ 'aria-label': 'Is active switch' }}
            />
          </div>
          <Button variant="contained" disableElevation style={{ height: 55 }} sx={{ backgroundColor: "#3d0066" }} onClick={() => {handleSubmit();
            setAddPop(false)
          }}>
            Submit
          </Button>
        </Box>
      </Popup>
      }
      {editPop && <Popup close={closePop} >
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
            label="Add Name"
    
            onChange={handleNameInputChange}
          />
          <TextField
            id="outlined-uncontrolled"
            label="Add description"
            onChange={handleDescriptionInputChange}
          />
          <div className='is-active'>
            <h3>Is Active</h3>
            <Switch
            // checked={isActive}
            // name="is_active"
            // inputProps={{ 'aria-label': 'Is active switch' }}
            onChange={handleIsActiveChange}
            />
          </div>
          <Button variant="contained" disableElevation style={{ height: 55 }} onClick={() => {handleEditPopupSubmit();;
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
