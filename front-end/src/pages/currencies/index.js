import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./currencies.css";
import { Box, TablePagination } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ErrorBoundary from "../../components/componentDidCatch";
import Swal from "sweetalert2";
import axios from "axios";


export default function Currencies() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);
  const [currencyInput, setCurrencyInput] = useState("");
  const [rateInput, setRateInput] = useState("");
  const [submitEdit, setSubmitEdit] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    {
      field: "currency",
      headerName: "Currency",
      width: 200,
      sortable: false,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 200,
      sortable: false,
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
              setSubmitEdit(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/currency");
        setCurrencyData(response.data.message);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setCurrencyData]);

  const handleCurrencyInputChange = (event) => {
    setCurrencyInput(event.target.value);
  };

  const handleRateInputChange = (event) => {
    setRateInput(event.target.value);
  };

  const handleSubmit = () => {
    try {
      axios
        .post("http://127.0.0.1:8000/api/currency", {
          currency: currencyInput,
          rate: rateInput,
        })
        .then((response) => {
          setCurrencyData([...currencyData, response.data.message.data]);
          setAddPop(false);
        });

      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
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
          await axios.delete(`http://127.0.0.1:8000/api/currency/${id}`);
          setCurrencyData(
            currencyData.filter((currency) => currency.id !== id)
          );
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleEditPopupSubmit = async () => {
    const newCurrency = { currency: currencyInput, rate: rateInput };
    setSubmitEdit(newCurrency);
    setCurrencyInput("");
    setRateInput("");
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

  const handleEdit = async (id) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/currency/${id}/`,
        { currency: currencyInput, rate: rateInput }
      );
      const updatedCurrency = response.data;
      const updatedData = currencyData.map((currency) =>
        currency.id === updatedCurrency.id ? updatedCurrency : currency
      );
      setCurrencyData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

        style={{ height: 600, width: 1000 }}
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
        <ErrorBoundary>
          <DataGrid
            rows={currencyData}
            columns={columns}
            className="table-currency"
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            sx={{ border: "1px solid #3d0066", borderRadius: "20px" }}
          />
        </ErrorBoundary>
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
            <TextField
              id="outlined-controlled"
              label="Add Currency"
              value={currencyInput}
              onChange={handleCurrencyInputChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Add Rate"
              value={rateInput}
              onChange={handleRateInputChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={handleSubmit}
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
            <h2>Edit Currency</h2>
            <TextField
              id="outlined-controlled"
              label="Edit Currency"
              value={currencyInput}
              onChange={handleCurrencyInputChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Edit Rate"
              value={rateInput}
              onChange={handleRateInputChange}
            />
            <Button
              onClick={() => {
                handleEditPopupSubmit();
                setEditPop(false);
              }}
            >
              Save
            </Button>
            <h2>Eddit Currency</h2>
            <form className="pop-up-form">
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
            </form>
          </Box>
        </Popup>
      )}
    </div>
  );
}
