
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
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import Loding from "../../components/loding/Loding";
import axios from "axios";
import Cookie from "js-cookie";

export default function FixedTransaction() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [fixedTransData, setFixedTransData] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fixedKeys, setFixedKeys] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const updateIsPaid = (value) => {
    setIsPaid(value);
  };

  const [inputTrans, setInputTrans] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    schedule: "",
    amount: "",
    date_time: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
    fixed_keys_id: "",
  });

  const [editInput, setEditInput] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    schedule: "",
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
      renderCell: (params) => (
        <Switch
          checked={params.value}
          name="is_paid"
          inputProps={{ "aria-label": "Is Paid switch" }}
        />
      ),
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
      headerName: "Currency",
      width: 70,
    },
    {
      field: "admins_id",
      headerName: "Admin",
      width: 70,
    },
    {
      field: "categories_id",
      headerName: "Category",
      width: 70,
    },
    {
      field: "fixed_keys_id",
      headerName: "For",
      width: 70,
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
              setSubmitEdit(params.row.id);
            }}
          />
        </>
      ),
    },
  ];

  const handleIsPaidChange = (event) => {
    setIsPaid(event.target.checked);
  };

  useEffect(() => {
    const fetchCurrencies = () => {
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get("http://127.0.0.1:8000/api/currency",config)
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
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get("http://127.0.0.1:8000/api/category" ,config)
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
    const fetchAdmins = () => {
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get("http://127.0.0.1:8000/api/admin" ,config)
        .then((response) => {
          setAdmins(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchFixedKeys = () => {
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get("http://127.0.0.1:8000/api/fixedkey",config)
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
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios
        .get("http://127.0.0.1:8000/api/fixedtransaction/all",config)
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
      is_paid: isPaid,
      amount: inputTrans.amount,
      date_time: inputTrans.date_time,
      currencies_id: inputTrans.currencies_id,
      admins_id: inputTrans.admins_id,
      categories_id: inputTrans.categories_id,
      fixed_keys_id: inputTrans.fixed_keys_id,
    };
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    const response = axios
      .post("http://127.0.0.1:8000/api/fixedtransaction", fetchdata , config)
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
    const { name, value, type, checked } = event.target;
    setEditInput((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditIsPaidChange = (event) => {
    setIsPaid(event.target.checked);
  };

  const handleEdit = (paid) => {
    const editFetchedData = {
      title: editInput.title,
      description: editInput.description,
      type: editInput.type,
      schedule: editInput.schedule,
      is_paid: paid !== undefined ? paid : isPaid,
      amount: editInput.amount,
      date_time: editInput.date_time,
      currencies_id: editInput.currencies_id,
      admins_id: editInput.admins_id,
      categories_id: editInput.categories_id,
      fixed_keys_id: editInput.fixed_keys_id,
    };
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .patch(
        `http://localhost:8000/api/fixedtransaction/id/${submitEdit}`,
        editFetchedData
      ,config)
      .then((response) => {
        console.log(response.data);
      });
    Swal.fire({
      icon: "success",
      title: "Fixed Transaction Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(editFetchedData);
  };

  const handleDelete = async (id) => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
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
            `http://127.0.0.1:8000/api/fixedtransaction/id/${id}`,config
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
  if (!fixedTransData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          alignItems: "center",
        }}
      >
        <Loding />
      </div>
    );
  }

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
            <InputLabel htmlFor="outlined-uncontrolled">Type </InputLabel>
            <Select
              label="Type"
              name="type"
              value={inputTrans.type}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Select transaction type</em>
              </MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>

            <InputLabel htmlFor="outlined-uncontrolled">Schedule </InputLabel>
            <Select
              label="Schedule"
              name="schedule"
              value={inputTrans.schedule}
              onChange={handleInputChange}
              placeholder="Select transaction Schedule"
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
            <InputLabel htmlFor="outlined-uncontrolled">Currency </InputLabel>
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
            <div id="ispaidInput">
              <h3>Is Paid</h3>
              <Switch
                value={isPaid}
                name="is_paid"
                label="is Paid"
                color="primary"
                onChange={handleIsPaidChange}
              />
            </div>
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
            <InputLabel htmlFor="outlined-uncontrolled">Admin </InputLabel>
            <Select
              labelId="Admin-label"
              id="adminInput"
              label="Admin"
              color="primary"
              name="admins_id"
              value={inputTrans.admins_id}
              onChange={(e) =>
                setInputTrans({
                  ...inputTrans,
                  admins_id: e.target.value,
                })
              }
            >
              {admins.map((admin) => (
                <MenuItem key={admin.id} value={admin.id}>
                  {admin.username}
                </MenuItem>
              ))}
            </Select>
            <InputLabel htmlFor="outlined-uncontrolled">Category </InputLabel>
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

            <InputLabel htmlFor="outlined-uncontrolled">Fixed Key </InputLabel>
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
            <InputLabel htmlFor="outlined-uncontrolled">Type </InputLabel>
            <Select
              label="Type"
              name="type"
              value={editInput.type}
              onChange={handleEditChange}
            >
              <MenuItem value="">
                <em>Select transaction type</em>
              </MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>

            <InputLabel htmlFor="outlined-uncontrolled">Schedule </InputLabel>
            <Select
              label="Schedule"
              name="schedule"
              value={editInput.schedule}
              onChange={handleEditChange}
              placeholder="Select transaction Schedule"
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
            <InputLabel htmlFor="outlined-uncontrolled">Currency </InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              name="currencies_id"
              value={editInput.currencies_id}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
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
            <div id="ispaidInput">
              <h3>Is Paid</h3>
              <Switch
                name="is_paid"
                label="is Paid"
                color="primary"
                value={updateIsPaid}
                onChange={handleEditIsPaidChange}
              />
            </div>
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
            <InputLabel htmlFor="outlined-uncontrolled">Admin </InputLabel>
            <Select
              labelId="Admin-label"
              id="adminInput"
              label="Admin"
              color="primary"
              name="admins_id"
              value={editInput.admins_id}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
                  admins_id: e.target.value,
                })
              }
            >
              {admins.map((admin) => (
                <MenuItem key={admin.id} value={admin.id}>
                  {admin.username}
                </MenuItem>
              ))}
            </Select>
            <InputLabel htmlFor="outlined-uncontrolled">Category </InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="categories_id"
              value={editInput.categories_id}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
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
            <InputLabel htmlFor="outlined-uncontrolled">Fixed Key </InputLabel>
            <Select
              labelId="fixedkey-label"
              id="fixedKeyInput"
              name="fixed_keys_id"
              value={editInput.fixed_keys_id}
              onChange={(e) =>
                setEditInput({
                  ...editInput,
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
          headerStyle={{ backgroundColor: "#3d0066" }}
        />
      </div>
    </div>
  );
}
