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
import Popup from "../../components/pop-up/Popup";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import MainButton from "../../components/main-button/index";

export default function RecurringTransactions() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "description", headerName: "Description", width: 160 },
    { field: "type", headerName: "Type", width: 80 },

    {
      field: "isPaid",
      headerName: "Is Paid",
      width: 70,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 70,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 100,
    },
    {
      field: "currenciesId",
      headerName: "Currencies ID",
      width: 10,
    },
    {
      field: "adminsId",
      headerName: "Admins ID",
      width: 10,
    },
    {
      field: "categoriesId",
      headerName: "Categories ID",
      width: 10,
    },
    {
      field: "fixedKeysId",
      headerName: "FixedKeys ID",
      width: 10,
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
    {
      field: "edit",
      headerName: "Edit",
      width: 10,
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
      width: 10,
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
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 2,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 3,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 4,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 5,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 6,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 7,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 8,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
    },
    {
      id: 9,
      title: "Snow",
      description: "Jon",
      type: "example",
      isPaid: "false",
      amount: "1000",
      Date: "2020-12-12",
      currenciesId: 1,
      adminsId: 1,
      categoriesId: 1,
      fixedKeysId: 1,
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
            <h2>Add Fixed Transaction</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Title"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Description"
                color="secondary"
                multiline
              />
              <TextField
                id="outlined-uncontrolled"
                label="Type"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="isPaid"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Amount"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Date"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Currencies ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Admins ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Categories ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Fixed Keys ID"
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
            </form>
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
            <h2>Edit Fixed Transactions</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Title"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Description"
                color="secondary"
                multiline
              />
              <TextField
                id="outlined-uncontrolled"
                label="Type"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="isPaid"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Amount"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Date"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Currencies ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Admins ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Categories ID"
                color="secondary"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Fixed Keys ID"
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
            </form>
          </Box>
        </Popup>
      )}
      <div
        style={
          {
            // height: 600,
            // width: 1050,
          }
        }
        className="pages-container"
      >
        <div className="admin-add-button">
          <MainButton name="Add Fixed Trans" onClick={() => setAddPop(true)} />
        </div>
        <DataTable rows={rows} columns={columns} />
      </div>
    </div>
  );
}
