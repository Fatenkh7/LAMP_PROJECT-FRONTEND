import React, { useState, useEffect } from "react";
import Report from "./repot";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MainButton from "../../components/main-button/index";
import axios from "axios";
import Loding from "../../components/loding/Loding";
import Popup from "../../components/pop-up/Popup";
import Swal from "sweetalert2";

function ReportChart(props) {
  const [visibleAdd, setVisibleAdd] = useState(false);

  const [showEdit, setShowedit] = useState(false);

  const [dataReport, setDataReport] = useState(null);

  const [addDataReport, setAddDataReport] = useState({
    report: "",
    type_report: "",
    admins_id: "",
    categories_id: "",
    start_date: "",
    end_date: "",
  });

  const [editDataReport, seteditDataReport] = useState({
    report: "",
    type_report: "",
    admins_id: "",
    categories_id: "",
    start_date: "",
    end_date: "",
  });

  const [editId, setEditId] = useState(null);

  const getId = (id) => {
    setEditId(id);
  };
  console.log(editId);
  const visibleEdit = () => {
    if (showEdit === false) {
      setShowedit(true);
    } else {
      setShowedit(false);
    }
  };

  const show = () => {
    if (visibleAdd === false) {
      setVisibleAdd(true);
    } else {
      setVisibleAdd(false);
    }
  };

  //get data

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/report");
      setDataReport(response.data.message.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //post data

  const handleChange = (e) => {
    const value = e.target.value;
    setAddDataReport({
      ...addDataReport,
      [e.target.name]: value,
    });
  };

  const handelSubmit = () => {
    const data = {
      report: addDataReport.report,
      type_report: addDataReport.type_report,
      admins_id: addDataReport.admins_id,
      categories_id: addDataReport.categories_id,
      start_date: addDataReport.start_date,
      end_date: addDataReport.end_date,
    };
    axios.post("http://127.0.0.1:8000/api/report", data).then((response) => {
      console.log(response);
      fetchData();
    });
    Swal.fire({
      icon: "success",
      title: "Report Added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //edit

  const handleEditChange = (e) => {
    const value = e.target.value;
    seteditDataReport({
      ...editDataReport,
      [e.target.name]: value,
    });
  };
  const handeleditSubmit = () => {
    const data = {
      report: editDataReport.report,
      type_report: editDataReport.type_report,
      admins_id: editDataReport.admins_id,
      categories_id: editDataReport.categories_id,
      start_date: editDataReport.start_date,
      end_date: editDataReport.end_date,
    };
    axios
      .patch(`http://127.0.0.1:8000/api/report/${editId}`, data)
      .then((response) => {
        console.log(response);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Report Updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!dataReport) {
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
    <div style={{ width: "100%", height: "84vh", position: "relative" }}>
      <div className="report">
        <div className="add-categories" style={{ width: "90%" }}>
          <MainButton name="Add Category" onClick={show} />
        </div>

        <div className="report-container">
          {dataReport.map((ele) => {
            return (
              <Report
                useEffect={fetchData}
                getId={getId}
                visibleEdit={visibleEdit}
                id={ele.id}
                report={ele.report}
                type={ele.type_report}
                admin={ele.admins_id}
                category={ele.categories_id}
                start_date={ele.start_date}
                end_date={ele.end_date}
              />
            );
          })}
        </div>
      </div>
      {visibleAdd && (
        <Popup>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setVisibleAdd(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
            // sx={{ width: "500px", backgroundColor: "white" }}
          >
            <h2>Add Report</h2>
            <TextField
              id="outlined-controlled"
              label="Add Report"
              name="report"
              onChange={handleChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Add Type"
              name="type_report"
              onChange={handleChange}
            />
            <TextField
              id="outlined-read-only"
              label="Admin"
              name="admins_id"
              onChange={handleChange}
            />
            <TextField
              id="outlined-read-only"
              label="Category"
              name="categories_id"
              onChange={handleChange}
            />
            <TextField
              id="outlined-read-only"
              label="Start date"
              name="start_date"
              onChange={handleChange}
            />
            <TextField
              id="outlined-read-only"
              label="End date"
              name="end_date"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                handelSubmit();
                setVisibleAdd(false);
              }}
            >
              Submit
            </Button>
          </Box>
          {/* </div> */}
        </Popup>
      )}
      {showEdit && (
        <Popup>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setShowedit(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Edit Report</h2>
            <TextField
              id="outlined-controlled"
              label="Add Report"
              name="report"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Add Type"
              name="type_report"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-read-only"
              label="Admin"
              name="admins_id"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-read-only"
              label="Category"
              name="categories_id"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-read-only"
              label="Start date"
              name="start_date"
              onChange={handleEditChange}
            />
            <TextField
              id="outlined-read-only"
              label="End date"
              name="end_date"
              onChange={handleEditChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                handeleditSubmit();
                setShowedit(false);
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

export default ReportChart;
