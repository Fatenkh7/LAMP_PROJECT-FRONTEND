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
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUp from "../../components/popup/index";
import DataTable from "../../components/data-table/index";
import Popup from "../../components/pop-up/Popup";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import MainButton from "../../components/main-button/index";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
} from "@mui/material";

export default function RecurringTransactions() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [Fetch, SetFetch] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(null);
  const [addRecTrans, setAddRecTrans] = useState({
    name: "",
    description: "",
    type: "",
    is_paid: "",
    amount: "",
    start_date: "",
    end_date: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
  });

  const [editRecTrans, setEditRecTrans] = useState({
    name: "",
    description: "",
    type: "",
    is_paid: "",
    amount: "",
    start_date: "",
    end_date: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
  });

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 100 },
    { field: "description", headerName: "Description", width: 160 },
    { field: "type", headerName: "Type", width: 80 },

    {
      field: "is_paid",
      headerName: "Is Paid",
      width: 70,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 70,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 100,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 100,
    },
    {
      field: "currencies_id",
      headerName: "Currencies ID",
      width: 10,
    },
    {
      field: "admins_id",
      headerName: "Admins ID",
      width: 10,
    },
    {
      field: "categories_id",
      headerName: "Categories ID",
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

  const handleFormChange = (e) => {
    const value = e.target.value;
    setAddRecTrans({ ...addRecTrans, [e.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setEditRecTrans({ ...editRecTrans, [event.target.name]: value });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/recurringTransaction"
      );
      SetFetch(response.data.data.data);
      console.log(response.data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    const fetchedData = {
      name: addRecTrans.name,
      description: addRecTrans.description,
      type: addRecTrans.type,
      is_paid: addRecTrans.is_paid,
      amount: addRecTrans.amount,
      start_date: addRecTrans.start_date,
      end_date: addRecTrans.end_date,
      currencies_id: addRecTrans.currencies_id,
      admins_id: addRecTrans.admins_id,
      categories_id: addRecTrans.categories_id,
    };

    const response = axios
      .post("http://localhost:8000/api/recurringTransaction", fetchedData)
      .then((response) => {
        console.log(response.data);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Recurring Transaction Added successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    console.log(addRecTrans);
  };

  const handleDelete = (id) => {
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
            .delete(`http://localhost:8000/api/recurringTransaction/${id}`)
            .then((response) => {
              SetFetch(Fetch);
              console.log(response.data);
              fetchData();
            });
        } catch (e) {
          console.log(e);
        }
        Swal.fire(
          "Deleted!",
          "Your Recurring Transaction has been deleted",
          "success"
        );
      }
    });
  };

  const handleEdit = () => {
    const editFetchedData = {
      name: editRecTrans.name,
      description: editRecTrans.description,
      type: editRecTrans.type,
      is_paid: editRecTrans.is_paid,
      amount: editRecTrans.amount,
      start_date: editRecTrans.start_date,
      end_date: editRecTrans.end_date,
      currencies_id: editRecTrans.currencies_id,
      admins_id: editRecTrans.admins_id,
      categories_id: editRecTrans.categories_id,
    };

    axios
      .patch(
        `http://localhost:8000/api/recurringTransaction/${submitEdit}`,
        editFetchedData
      )
      .then((response) => {
        console.log(response.data);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Recurring Transaction Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(editRecTrans);
  };

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
            noValidate
            autoComplete="off"
          >
            <h2>Add Recurring Transaction</h2>
            <TextField
              id="outlined-controlled"
              label="Name"
              color="secondary"
              name="name"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Description"
              color="secondary"
              name="description"
              onChange={handleFormChange}
              multiline
            />
            <TextField
              id="outlined-uncontrolled"
              label="Type"
              name="type"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="isPaid"
              name="is_paid"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Amount"
              name="amount"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Start Date"
              name="start_date"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="End Date"
              name="end_date"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Currencies ID"
              name="currencies_id"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Admins ID"
              name="admins_id"
              color="secondary"
              onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Categories ID"
              name="categories_id"
              color="secondary"
              onChange={handleFormChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ margin: 0, padding: 10 }}
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
            <h2>Edit Recurring Transactions</h2>
            <TextField
              id="outlined-controlled"
              label="Name"
              color="secondary"
              name="name"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Description"
              color="secondary"
              name="description"
              onChange={handleEditChange}
              multiline
            />
            <TextField
              id="outlined-uncontrolled"
              label="Type"
              color="secondary"
              name="type"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="isPaid"
              color="secondary"
              name="is_paid"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Amount"
              color="secondary"
              name="amount"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Start Date"
              color="secondary"
              name="start_date"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="End Date"
              color="secondary"
              name="end_date"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Currencies ID"
              color="secondary"
              name="currencies_id"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Admins ID"
              color="secondary"
              name="admins_id"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Categories ID"
              color="secondary"
              name="categories_id"
              onChange={handleEditChange}
            />
            <Button
              variant="contained"
              disableElevation
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
          {/* <button
            onClick={() => {
              setAddPop(true);
            }}
          >
            Add Rec Trans
          </button> */}
          <MainButton name="Add Rec Trans" onClick={() => setAddPop(true)} />
        </div>
        <DataTable rows={Fetch} columns={columns} />
      </div>
    </div>
  );
}
