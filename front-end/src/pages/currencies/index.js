import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./currencies.css";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Currencies() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "currency", headerName: "Currency", width: 300 },
    { field: "rate", headerName: "Rate", width: 300 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,

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
      width: 100,

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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/currency")
      .then((response) => {
        setCurrencyData(response.data.message.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="currencies-main-container">
      <div
        className="currencies-container"
        style={{
          height: 600,
          width: 1000,
        }}
      >
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
        <DataGrid
          rows={currencyData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          className="table-currency"
          sx={{ border: "1px solid #3d0066", borderRadius: "20px" }}
        />
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
