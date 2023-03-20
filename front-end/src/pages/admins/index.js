import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../components/pop-up/Popup";
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "../../components/data-table/index";
import MainButton from "../../components/main-button/index";
import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookie from "js-cookie";

function Admins() {
  // const [data, setData] = useState([]);

  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [Fetch, SetFetch] = useState([]);
  const [adminData, setAdminData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    is_super: "",
  });

  const [editAdmin, setEditAdmin] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    is_super: "",
  });
  const [submitEdit, setSubmitEdit] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First name",
      width: 130,
    },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "is_super", headerName: "Is Super", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 160,
    },
    {
      field: "password",
      headerName: "Password",
      width: 160,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => {
              setEditPop(true);
              setSubmitEdit(params.id);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin",config);
      SetFetch(response.data.message.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setAdminData({ ...adminData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setEditAdmin({ ...editAdmin, [event.target.name]: value });
  };

  // Delete

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
          await axios
            .delete(`http://127.0.0.1:8000/api/admin/${id}`,config)
            .then((response) => {
              SetFetch(Fetch);
              console.log(response.data);
              fetchData();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your admin has been deleted.", "success");
      }
    });
  };
  // post
  const handleSubmit = () => {
    const fettchdata = {
      first_name: adminData.first_name,
      last_name: adminData.last_name,
      username: adminData.username,
      email: adminData.email,
      password: adminData.password,
      is_super: adminData.is_super,
    };

    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    const response = axios
      .post("http://localhost:8000/api/admin", fettchdata ,config)
      .then((response) => {
        console.log(response.data);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Admin Added successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    console.log(adminData);
  };

  // Edit
  const handleEdit = () => {
    const editFettchdata = {
      first_name: editAdmin.first_name,
      last_name: editAdmin.last_name,
      username: editAdmin.username,
      email: editAdmin.email,
      password: editAdmin.password,
      is_super: editAdmin.is_super,
    };

    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }


    axios
      .patch(`http://localhost:8000/api/admin/${submitEdit}`, editFettchdata ,config)
      .then((response) => {
        console.log(response.data);
        fetchData();
      });

    Swal.fire({
      icon: "success",
      title: "Admin Updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    console.log(editAdmin);
  };

  if (!adminData) {
    return "loading";
  }

  return (
    <div className="admin-data">
      {addPop && (
        <Popup close={closePop}>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setAddPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box className="add-currency-box" autoComplete="off">
            <h2>Add Admin</h2>
            <TextField
              id="outlined-controlled"
              label="First Name"
              name="first_name"
              color="secondary"
              value={adminData.first_name}
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last Name"
              name="last_name"
              color="secondary"
              value={adminData.last_name}
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Username"
              name="username"
              color="secondary"
              value={adminData.username}
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              name="email"
              color="secondary"
              value={adminData.email}
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Is Super"
              name="is_super"
              color="secondary"
              value={adminData.is_super}
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              name="password"
              color="secondary"
              value={adminData.password}
              onChange={handleFormChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                handleSubmit();
                setAddPop(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      )}
      {editPop && (
        <Popup close={closePop}>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setEditPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-currency-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Edit Admin</h2>
            <TextField
              id="outlined-controlled"
              label="First Name"
              color="secondary"
              name="first_name"
              // value={editAdmin.first_name}
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last Name"
              color="secondary"
              name="last_name"
              // value={editAdmin.last_name}
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Username"
              color="secondary"
              name="username"
              // value={editAdmin.username}
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              color="secondary"
              name="email"
              // value={editAdmin.email}
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Is Super"
              color="secondary"
              name="is_super"
              // value={editAdmin.is_super}
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              color="secondary"
              name="password"
              // value={editAdmin.password}
              onChange={handleEditChange}
            />
            <Button
              variant="contained"
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                handleEdit();
                setEditPop(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      )}
      <div style={{}} className="pages-container">
        <div className="admin-add-button">
          <MainButton name="Add Admin" onClick={() => setAddPop(true)} />
        </div>
        <DataTable rows={Fetch} columns={columns} />
      </div>
    </div>
  );
}

export default Admins;
