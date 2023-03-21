import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import MainButton from "../../components/main-button/index";
import { Select, MenuItem, InputLabel } from "@mui/material";
// import { FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

export default function FixedTransaction() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [fixedTransData, setFixedTransData] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fixedKeys, setFixedKeys] = useState([]);

  const [inputTrans, setInputTrans] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    schedule: "",
    is_paid: 0,
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
    is_paid: 0,
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
    {
      field: "fixed_keys_id",
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
            onClick={() => handleDelete(params.row.id)}
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
    const fetchCurrencies = () => {
      axios
        .get("http://127.0.0.1:8000/api/currency")
        .then((response) => {
          setCurrencies(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchCategories = () => {
      axios
        .get("http://127.0.0.1:8000/api/category")
        .then((response) => {
          setCategories(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFixedKeys = () => {
      axios
        .get("http://127.0.0.1:8000/api/fixedkey")
        .then((response) => {
          setFixedKeys(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchFixedKeys();
  }, []);

  useEffect(() => {
    const fetchDataTrans = () => {
      axios
        .get("http://127.0.0.1:8000/api/fixedtransaction/all")
        .then((response) => {
          setFixedTransData(response.data.message);
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
    const { name, value } = event.target;
    setEditInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleEditPopupSubmit = async () => {
    const newTransaction = {
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
    setSubmitEdit(newTransaction);
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

  const handleDelete = async (id) => {
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
          await axios.delete(
            `http://127.0.0.1:8000/api/fixedtransaction/id/${id}`
          );
          setFixedTransData(fixedTransData.filter((trans) => trans.id !== id));
        } catch (error) {
          console.log(error);
        }
        Swal.fire(
          "Deleted!",
          "Your fixed transaction has been deleted.",
          "success"
        );
      }
    });
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
            <div className="pop-up-form-flex">
              <h2>Add Fixed Transaction</h2>
              <TextField
                id="titleInput"
                label="Title"
                color="primary"
                value={inputTrans.title}
                onChange={handleInputChange}
                name="title"
              />
              <TextField
                id="descriptionInput"
                label="Description"
                color="primary"
                multiline
                value={inputTrans.description}
                onChange={handleInputChange}
                name="description"
              />
              <InputLabel htmlFor="outlined-uncontrolled">
                Type
                <Select
                  label="Type"
                  name="type"
                  value={inputTrans.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>Select transaction type</em>
                  </MenuItem>
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </InputLabel>

              <InputLabel htmlFor="outlined-uncontrolled">
                Schedule
                <Select
                  label="Schedule"
                  name="schedule"
                  value={inputTrans.schedule}
                  onChange={handleInputChange}
                  placeholder="Select transaction Schedule"
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </InputLabel>
              <InputLabel htmlFor="outlined-uncontrolled">
                Currency
                <Select
                  labelId="currency-label"
                  id="currency"
                  name="currencies_id"
                  value={inputTrans.currencies_id}
                  onChange={(e) =>
                    setInputTrans({
                      ...inputTrans,
                      currencies_id: e.target.value,
                    })
                  }
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency.id}>
                      {currency.currency}
                    </MenuItem>
                  ))}
                </Select>
              </InputLabel>

              <TextField
                id="ispaidInput"
                label="is Paid"
                color="primary"
                value={inputTrans.is_paid}
                onChange={handleInputChange}
                name="is_paid"
              />
              <TextField
                id="amountInput"
                label="Amount"
                color="primary"
                value={inputTrans.amount}
                onChange={handleInputChange}
                name="amount"
              />
              <TextField
                margin="dense"
                label="Date"
                name="date_time"
                fullWidth
                onChange={handleInputChange}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="adminInput"
                label="Admin"
                color="primary"
                value={inputTrans.admins_id}
                onChange={handleInputChange}
                name="admins_id"
              />
              <InputLabel htmlFor="outlined-uncontrolled">
                Category
                <Select
                  labelId="category-label"
                  id="category"
                  name="categories_id"
                  value={inputTrans.categories_id}
                  onChange={(e) =>
                    setInputTrans({
                      ...inputTrans,
                      categories_id: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </InputLabel>

              <InputLabel htmlFor="outlined-uncontrolled">
                Fixed Key
                <Select
                  labelId="fixedkey-label"
                  id="fixedKeyInput"
                  name="fixed_keys_id"
                  value={inputTrans.fixed_keys_id}
                  onChange={(e) =>
                    setInputTrans({
                      ...inputTrans,
                      fixed_keys_id: e.target.value,
                    })
                  }
                >
                  {fixedKeys.map((fixedKey) => (
                    <MenuItem key={fixedKey.id} value={fixedKey.id}>
                      {fixedKey.name}
                    </MenuItem>
                  ))}
                </Select>
              </InputLabel>

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
            </div>
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
            <h2>Edit Fixed Transactions</h2>
            <TextField
              id="titleInput"
              label="Title"
              color="primary"
              value={editInput.title}
              onChange={handleEditChange}
              name="title"
            />
            <TextField
              id="descriptionInput"
              label="Description"
              color="primary"
              multiline
              value={editInput.description}
              onChange={handleEditChange}
              name="description"
            />
            <InputLabel htmlFor="outlined-uncontrolled">
              Type
              <Select
                label="Type"
                name="type"
                value={editInput.type}
                onChange={handleEditChange}
              >
                <MenuItem value="">
                  <em>Select transaction type</em>
                </MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </InputLabel>

            <InputLabel htmlFor="outlined-uncontrolled">
              Schedule
              <Select
                label="Schedule"
                name="schedule"
                value={editInput.schedule}
                onChange={handleEditChange}
                placeholder="Select transaction Schedule"
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </InputLabel>
            <InputLabel htmlFor="outlined-uncontrolled">
              Currency
              <Select
                labelId="currency-label"
                id="currency"
                name="currencies_id"
                value={editInput.currencies_id}
                onChange={handleEditChange}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.currency}
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>

            <TextField
              id="ispaidInput"
              label="is Paid"
              color="primary"
              value={editInput.is_paid}
              onChange={handleEditChange}
              name="is_paid"
            />
            <TextField
              id="amountInput"
              label="Amount"
              color="primary"
              value={editInput.amount}
              onChange={handleEditChange}
              name="amount"
            />
            <TextField
              margin="dense"
              label="Date"
              name="date_time"
              fullWidth
              value={editInput.date_time}
              onChange={handleEditChange}
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="adminInput"
              label="Admin"
              color="primary"
              value={editInput.admins_id}
              onChange={handleEditChange}
              name="admins_id"
            />
            <InputLabel htmlFor="outlined-uncontrolled">
              Category
              <Select
                labelId="category-label"
                id="category"
                name="categories_id"
                value={editInput.categories_id}
                onChange={handleEditChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>
            <InputLabel htmlFor="outlined-uncontrolled">
              Fixed Key
              <Select
                labelId="fixedkey-label"
                id="fixedKeyInput"
                name="fixed_keys_id"
                value={editInput.fixed_keys_id}
                onChange={handleEditChange}
              >
                {fixedKeys.map((fixedKey) => (
                  <MenuItem key={fixedKey.id} value={fixedKey.id}>
                    {fixedKey.name}
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>

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
