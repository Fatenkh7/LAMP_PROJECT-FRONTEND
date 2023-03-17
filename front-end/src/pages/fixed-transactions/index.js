import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
// import "./style.css";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import MainButton from "../../components/main-button/index";
import Swal from "sweetalert2";
import axios from "axios";

export default function FixedTransaction() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [fixedTransData, setFixedTransData] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(null);
  const getRowId = (row) => row.id;

  const [inputTrans, setInputTrans] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    schedule: "",
    is_paid: false,
    amount: "",
    date_time: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
    fixed_keys_id: "",
  });

  const [editInput, setEditInput] = useState({
    title: "",
    description: "",
    type: "",
    schedule: "",
    is_paid: false,
    amount: "",
    date_time: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
    fixed_keys_id: "",
  });

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "description", headerName: "Description", width: 160 },
    { field: "type", headerName: "Type", width: 80 },
    { field: "schedule", headerName: "Schedule", width: 80 },
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
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <DeleteIcon
            color="secondary"
            aria-label="delete"
          />
          <EditIcon
            color="primary"
            aria-label="edit"
            onClick={() => {
              setEditPop(true);
              setSubmitEdit(params.row);
            }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchDataTrans = () => {
      axios
        .get("http://127.0.0.1:8000/api/fixedtransaction/all")
        .then((response) => {
          setFixedTransData(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchDataTrans();
  }, [setFixedTransData]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputTrans((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const fetchdata = {
      title: inputTrans.title,
      description: inputTrans.description,
      type: inputTrans.type,
      schedule: inputTrans.schedule,
      is_paid: inputTrans.is_paid,
      amount: inputTrans.amount,
      date_time: inputTrans.date_time,
      currencies_id: inputTrans.currencies_id,
      admins_id: inputTrans.admins_id,
      categories_id: inputTrans.categories_id,
      fixed_keys_id: inputTrans.fixed_keys_id,
    };

    const response = axios
      .post("http://127.0.0.1:8000/api/fixedtransaction", fetchdata)
      .then((response) => {
        console.log(response.data);
        // calling fetchdata() will result in an error since fetchdata is an object
        // instead, you might want to fetch the data again after the post request
      });
    Swal.fire({
      icon: "success",
      title: "Fixed Transaction Added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleEditChange = (event) => {
    const value = event.target.value;
    setEditInput({ ...editInput, [event.target.name]: value });
  };

  const handleEditPopupSubmit = async () => {
    const editedTransaction = {
      title: editInput.title,
      description: editInput.description,
      type: editInput.type,
      schedule: editInput.schedule,
      is_paid: editInput.is_paid,
      amount: editInput.amount,
      date_time: editInput.date_time,
      currencies_id: editInput.currencies_id,
      admins_id: editInput.admins_id,
      categories_id: editInput.categories_id,
      fixed_keys_id: editInput.fixed_keys_id,
    };
    setSubmitEdit(editedTransaction);
    setEditInput({
      title: "",
      description: "",
      type: "",
      schedule: "",
      is_paid: false,
      amount: "",
      date_time: "",
      currencies_id: "",
      admins_id: "",
      categories_id: "",
      fixed_keys_id: "",
    });
    setEditPop(false);
    try {
      await handleEdit(submitEdit.id);
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

  const handleEdit = async (id, editedTransaction) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/fixedtransaction/id/${id}/`,
        editedTransaction
      );
      const updatedTransaction = response.data;
      const updatedData = fixedTransData.map((trans) =>
        trans.id === updatedTransaction.id ? updatedTransaction : trans
      );
      setFixedTransData(updatedData);
    } catch (error) {
      console.log(error);
    }
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
            <h2>Add Fixed Transaction</h2>
            <TextField
              id="titleInput"
              label="Title"
              color="primary-colo"
              value={inputTrans.title}
              onChange={handleInputChange}
              name="title"
            />
            <TextField
              id="descriptionInput"
              label="Description"
              color="primary-colo"
              multiline
              value={inputTrans.description}
              onChange={handleInputChange}
              name="description"
            />
            <TextField
              id="typeInput"
              label="Type"
              color="primary-colo"
              value={inputTrans.type}
              onChange={handleInputChange}
              name="type"
            />
            <TextField
              id="scheduleInput"
              label="Schedule"
              color="primary-colo"
              value={inputTrans.schedule}
              onChange={handleInputChange}
              name="schedule"
            />
            <TextField
              id="ispaidInput"
              label="is Paid"
              color="primary-colo"
              value={inputTrans.is_paid}
              onChange={handleInputChange}
              name="is_paid"
            />
            <TextField
              id="amountInput"
              label="Amount"
              color="primary-colo"
              value={inputTrans.amount}
              onChange={handleInputChange}
              name="amount"
            />
            <TextField
              id="dateTimeInput"
              label="Date"
              color="primary-colo"
              value={inputTrans.date_time}
              onChange={handleInputChange}
              name="date_time"
            />
            <TextField
              id="currenyInput"
              label="Currency"
              color="primary-colo"
              value={inputTrans.currencies_id}
              onChange={handleInputChange}
              name="currencies_id"
            />
            <TextField
              id="adminInput"
              label="Admin"
              color="primary-colo"
              value={inputTrans.admins_id}
              onChange={handleInputChange}
              name="admins_id"
            />
            <TextField
              id="categoryInput"
              label="Category"
              color="primary-colo"
              value={inputTrans.categories_id}
              onChange={handleInputChange}
              name="categories_id"
            />
            <TextField
              id="fixedKeyInput"
              label="Fixed Key"
              color="primary-colo"
              value={inputTrans.fixed_keys_id}
              onChange={handleInputChange}
              name="fixed_keys_id"
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
                value={editInput.title}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Description"
                multiline
                value={editInput.description}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Type"
                value={editInput.type}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Schedule"
                value={editInput.schedule}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="is Paid"
                value={editInput.is_paid}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Amount"
                value={editInput.amount}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Date"
                value={editInput.date_time}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Currency"
                value={editInput.currencies_id}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Admin"
                value={editInput.admins_id}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Category"
                value={editInput.categories_id}
                onChange={handleEditChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Fixed Key"
                value={editInput.fixed_keys_id}
                onChange={handleEditChange}
              />
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
                onClick={() => {
                  handleEditPopupSubmit();
                  setEditPop(false);
                }}
              >
                Save
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
        <DataGrid
          rows={fixedTransData}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </div>
    </div>
  );
}
