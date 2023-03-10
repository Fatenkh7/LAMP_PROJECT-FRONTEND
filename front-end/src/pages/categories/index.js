import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./Categories.css";
// import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import { useState } from "react";
import TextField from "@mui/material/TextField";
// import { height } from '@mui/system';
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "../../components/data-table/index";

export default function Categories() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "description", headerName: "Description", width: 200 },

    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <DeleteIcon
          sx={{ color: "#3d0066" }}
          style={{ cursor: "pointer" }}
          onClick={() => console.log(`Deleting row ${params.id}`)}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => (
        <div>
          <EditIcon
            onClick={() => {
              setEditPop(true);
            }}
            sx={{ color: "#3d0066" }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const rows = [
    { id: 1, description: "Snow", category: "Jon" },
    { id: 2, description: "Lannister", category: "Cersei" },
    { id: 3, description: "Lannister", category: "Jaime" },
    { id: 4, description: "Stark", category: "Arya" },
    { id: 5, description: "Targaryen", category: "Daenerys" },
    { id: 6, description: "Melisandre", category: null },
    { id: 7, description: "Clifford", category: "Ferrara" },
    { id: 8, description: "Frances", category: "Rossini" },
    { id: 9, description: "Roxie", category: "Harvey" },
  ];

  return (
    <div className="admin-data">
      <div className="categories-container pages-container">
        <div className="add-categories">
          <Button
            variant="contained"
            disableElevation
            className="add-categories-btn"
            onClick={() => {
              setAddPop(true);
            }}
          >
            <AddIcon />
            Add Category
          </Button>
        </div>
        <DataTable rows={rows} columns={columns} />
        {/* </div> */}
      </div>
      {addPop && (
        <Popup close={closePop}>
          <div
            className="categories-close-popup"
            onClick={() => {
              setAddPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <h2>Add Category</h2>
            <TextField id="outlined-controlled" label="Add Category" />
            <TextField id="outlined-uncontrolled" label="Add Description" />
            <div className="categories-admin">
              <TextField
                id="outlined-read-only"
                label="Admin"
                value={""}
                readOnly
              />
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
              >
                Assign to me
              </Button>
            </div>
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
            className="categories-close-popup"
            onClick={() => {
              setEditPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <h2>Edit Category</h2>
            <TextField id="outlined-controlled" label="Add Category" />
            <TextField id="outlined-uncontrolled" label="Add description" />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              onClick={() => {
                setEditPop(false);
              }}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      )}
    </div>
  );
}
