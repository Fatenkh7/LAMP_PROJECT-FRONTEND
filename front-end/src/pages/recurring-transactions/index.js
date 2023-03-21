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
import { Box, Switch } from "@mui/material";
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
import Loding from "../../components/loding/Loding";
import { Select, InputLabel } from "@mui/material";

export default function RecurringTransactions() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [Fetch, SetFetch] = useState([]);
  const [submitEdit, setSubmitEdit] = useState(null);
  const [addRecTrans, setAddRecTrans] = useState({
    name: "",
    description: "",
    type: "",
    is_paid: false,
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
    is_paid: false,
    amount: "",
    start_date: "",
    end_date: "",
    currencies_id: "",
    admins_id: "",
    categories_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const updateIsPaid = (value) => {
    setIsPaid(value);
  };

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

  const handleIsPaidChange = (e) => {
    const value = e.target.value;
    if (e.target.checked === false) {
      setIsPaid({ ...isPaid, [e.target.name]: 1 });
    } else {
      setIsPaid({ ...isPaid, [e.target.name]: 0 });
    }
    console.log(isPaid);
  };

  const handleEditIsPaidChange = (event) => {
    if (event.target.checked === false) {
      setIsPaid(1);
    } else {
      setIsPaid(0);
    }
    console.log(isPaid);
  };

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

  useEffect(() => {
    const fetchCategories = () => {
      axios
        .get("http://127.0.0.1:8000/api/category")
        .then((response) => {
          setCategories(response.data.message);
          // console.log(response.data.message.data);
          // console.log(categories);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCategories();
  }, []);

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
    const fetchAdmins = () => {
      axios
        .get("http://127.0.0.1:8000/api/admin")
        .then((response) => {
          setAdmins(response.data.message.data);
          console.log(response.data.message.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchAdmins();
  }, []);

  if (!Fetch) {
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
            <h2>Add Recurring Transaction</h2>
            <div className="pop-up-form-flex">
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
              <InputLabel htmlFor="outlined-uncontrolled">
                Type
                <Select
                  label="Type"
                  name="type"
                  // value={inputTrans.type}
                  onChange={handleFormChange}
                >
                  <MenuItem value="">
                    <em>Select transaction type</em>
                  </MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </InputLabel>
              <div
                id="ispaidInput"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
                type="datetime-local"
                onChange={handleFormChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="End Date"
                name="end_date"
                color="secondary"
                type="datetime-local"
                onChange={handleFormChange}
              />
              <InputLabel htmlFor="outlined-uncontrolled">
                Currency
                <Select
                  labelId="currency-label"
                  id="currency"
                  name="currencies_id"
                  onChange={(e) =>
                    setAddRecTrans({
                      ...addRecTrans,
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
              <InputLabel htmlFor="outlined-uncontrolled">
                Admin
                <Select
                  labelId="Admin-label"
                  id="adminInput"
                  label="Admin"
                  color="primary"
                  name="admins_id"
                  onChange={(e) =>
                    setAddRecTrans({
                      ...addRecTrans,
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
              </InputLabel>
              <InputLabel htmlFor="outlined-uncontrolled">
                Category
                <Select
                  labelId="category-label"
                  id="category"
                  name="categories_id"
                  onChange={(e) =>
                    setAddRecTrans({
                      ...addRecTrans,
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
            <h2>Edit Recurring Transactions</h2>
            <TextField
              id="outlined-controlled"
              label="Name"
              color="secondary"
              name="name"
              focused
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
            <InputLabel htmlFor="outlined-uncontrolled">
              Type
              <Select
                label="Type"
                name="type"
                // value={inputTrans.type}
                onChange={handleEditChange}
              >
                <MenuItem value="">
                  <em>Select transaction type</em>
                </MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </InputLabel>
            <div
              id="ispaidInput"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3>Is Paid</h3>
              <Switch
                name="is_paid"
                label="is Paid"
                color="primary"
                value={isPaid}
                onChange={handleEditIsPaidChange}
              />
            </div>
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
              type="datetime-local"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="End Date"
              color="secondary"
              name="end_date"
              type="datetime-local"
              onChange={handleEditChange}
            />
            <InputLabel htmlFor="outlined-uncontrolled">
              Currency
              <Select
                labelId="currency-label"
                id="currency"
                name="currencies_id"
                onChange={(e) =>
                  setEditRecTrans({
                    ...editRecTrans,
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
            <InputLabel htmlFor="outlined-uncontrolled">
              Admin
              <Select
                labelId="Admin-label"
                id="adminInput"
                label="Admin"
                color="primary"
                name="admins_id"
                onChange={(e) =>
                  setEditRecTrans({
                    ...editRecTrans,
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
            </InputLabel>
            <InputLabel htmlFor="outlined-uncontrolled">
              Category
              <Select
                labelId="category-label"
                id="category"
                name="categories_id"
                onChange={(e) =>
                  setEditRecTrans({
                    ...editRecTrans,
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
