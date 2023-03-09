// import React from "react";
// import Grid from "@mui/material/Grid";

// function Admins() {
//   return <div>Admins</div>;
// }

// export default Admins;

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
// import "./style.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUp from "../../components/popup/index";
import DataTable from "../../components/data-table/index";

export default function RecurringTransactions() {
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);

  const addVisible = () => {
    if (isAdd === false) {
      setAdd(true);
    }
  };
  const editVisible = () => {
    if (isEdit === false) {
      setEdit(true);
    }
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
            onClick={editVisible}
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
      {isAdd && (
        <PopUp>
          <button className="admin-close-btn" onClick={() => setAdd(false)}>
            x
          </button>
          <h2>Add Admin</h2>
          <div className="admin-add-card-content">
            <div>
              <input type="text" placeholder="First Name" />
            </div>
            <div>
              <input type="text" placeholder="Last Name" />
            </div>
            <div>
              <input type="text" placeholder="Username" />
            </div>
            <div>
              <input type="username" placeholder="Email" />
            </div>
            <div>
              <input type="password" placeholder="Password" />
            </div>
            <div className="add-admin-btns-container">
              <button
                className="admin-add-cancel-btn"
                onClick={() => setAdd(false)}
              >
                Cancel
              </button>
              <button className="admin-add-save-btn">Save</button>
            </div>
          </div>
        </PopUp>
      )}
      {isEdit && (
        <PopUp>
          <button className="admin-close-btn" onClick={() => setEdit(false)}>
            x
          </button>
          <h2>Edit Admin</h2>
          <div className="admin-add-card-content">
            <div>
              <input type="text" placeholder="First Name" />
            </div>
            <div>
              <input type="text" placeholder="Last Name" />
            </div>
            <div>
              <input type="text" placeholder="Username" />
            </div>
            <div>
              <input type="username" placeholder="Email" />
            </div>
            <div>
              <input type="password" placeholder="Password" />
            </div>
            <div className="add-admin-btns-container">
              <button
                className="admin-add-cancel-btn"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button className="admin-add-save-btn">Save</button>
            </div>
          </div>
        </PopUp>
      )}
      <div
        style={{
          height: 600,
          width: 1000,
        }}
      >
        <div className="admin-add-button">
          <button onClick={addVisible}>Add Admin</button>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
          // rows={rows}
          // columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          // checkboxSelection
          // sx={{
          //   border: "1px solid #3d0066",
          //   borderRadius: "20px",
          //   boxShadow: "0 2px 15px rgba(0,0,0,0.4)",
          // }}
        />
      </div>
    </div>
  );
}
