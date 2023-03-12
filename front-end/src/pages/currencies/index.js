import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./currencies.css";
// import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Currencies() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/currency")
      .then((response) => {
        setData(
          response.data.map((row) => ({
            id: row.id,
            rate: row.rate,
            currency: row.currency,
          }))
        );
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  return (
    <div>
      <div className="currencies-container">
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
          rows={data}
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
