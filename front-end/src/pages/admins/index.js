// import React from "react";
// import Grid from "@mui/material/Grid";

// function Admins() {
//   return <div>Admins</div>;
// }

// export default Admins;

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import "./style.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import PopUp from "../../components/popup/index";
import Popup from "../../components/pop-up/Popup";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import DataTable from "../../components/data-table/index";

export default function Admins() {
  // const [isAdd, setAdd] = useState(false);
  // const [isEdit, setEdit] = useState(false);

  // const addVisible = () => {
  //   if (isAdd === false) {
  //     setAdd(true);
  //   }
  // };
  // const editVisible = () => {
  //   if (isEdit === false) {
  //     setEdit(true);
  //   }
  // };

  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "username", headerName: "Username", width: 130 },

    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 160,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <div>
          <EditIcon
            sx={{ color: "#3d0066" }}
            onClick={() => setEditPop(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <div>
          <DeleteIcon sx={{ color: "#3d0066" }} style={{ cursor: "pointer" }} />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: "Jordan",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      username: "example",
      email: "example@gmail.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      username: "example",
      email: "example@gmail.com",
    },
  ];

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
          <Box
            className="add-currency-box"
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <h2>Add Admin</h2>
            <TextField
              id="outlined-controlled"
              label="First Name"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last Name"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Username"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              color="secondary"
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
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
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <h2>Edit Admin</h2>
            <TextField
              id="outlined-controlled"
              label="First Name"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last Name"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Username"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              color="secondary"
            />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              color="secondary"
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                setEditPop(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      )}
      <div
        style={
          {
            // height: 600,
            // width: 1000,
          }
        }
        className="pages-container"
      >
        <div className="admin-add-button">
          <button
            onClick={() => {
              setAddPop(true);
            }}
          >
            Add Admin
          </button>
        </div>
        <DataTable rows={rows} columns={columns} />
      </div>
    </div>
  );
}
