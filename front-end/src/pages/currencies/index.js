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
import ErrorBoundary from "../../components/componentDidCatch";
import axios from "axios";

export default function Currencies() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [currencyData, setCurrencyData] = useState([]);
  const [currencyInput, setCurrencyInput] = useState("");
  const [rateInput, setRateInput] = useState("");

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
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/currency");
        const currencyDataWithId = response.data.message.data.map(
          (currency) => {
            return {
              ...currency,
              id: currency.id,
            };
          }
        );
        setCurrencyData(currencyDataWithId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCurrencyInputChange = (event) => {
    setCurrencyInput(event.target.value);
  };

  const handleRateInputChange = (event) => {
    setRateInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/currency", {
        currency: currencyInput,
        rate: rateInput,
      });
      setCurrencyData([...currencyData, response.data]);
      setAddPop(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="currencies-main-container">
      <div
        className="currencies-container"
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
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            className="table-currency"
            sx={{ border: "1px solid #3d0066", borderRadius: "20px" }}
            getRowId={(row) => row.id} // add this line
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
