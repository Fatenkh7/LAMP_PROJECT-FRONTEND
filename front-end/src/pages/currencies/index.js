import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./currencies.css";
// import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import { useState } from "react";
import TextField from "@mui/material/TextField";
// import { height } from '@mui/system';
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "../../components/data-table/index";

export default function Currencies() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "currency", headerName: "Currency", width: 200 },
    { field: "rate", headerName: "Rate", width: 200 },

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
    { id: 1, rate: "Snow", currency: "Jon" },
    { id: 2, rate: "Lannister", currency: "Cersei" },
    { id: 3, rate: "Lannister", currency: "Jaime" },
    { id: 4, rate: "Stark", currency: "Arya" },
    { id: 5, rate: "Targaryen", currency: "Daenerys" },
    { id: 6, rate: "Melisandre", currency: null },
    { id: 7, rate: "Clifford", currency: "Ferrara" },
    { id: 8, rate: "Frances", currency: "Rossini" },
    { id: 9, rate: "Roxie", currency: "Harvey" },
  ];

  return (
    <div className="admin-data">
      <div className="currencies-container pages-container">
        <div className="add-currencies">
          <Button
            variant="contained"
            disableElevation
            className="add-currencies-btn"
            onClick={() => {
              setAddPop(true);
            }}
          >
            <AddIcon />
            Add Currency
          </Button>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          // checkboxSelection
          // className="table-currency"
          // sx={{ border: "1px solid #3d0066", borderRadius: "20px" }}
        />
        {/* </div> */}
      </div>
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
            <h2>Add Currency</h2>
            <TextField id="outlined-controlled" label="Add Currency" />
            <TextField id="outlined-uncontrolled" label="Add Rate" />
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
            <h2>Eddit Currency</h2>
            <TextField id="outlined-controlled" label="Add Currency" />
            <TextField id="outlined-uncontrolled" label="Add Rate" />
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
    </div>
  );
}
