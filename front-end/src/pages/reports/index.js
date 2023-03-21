import React, { useState, useEffect } from "react";
import Report from "./repot";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Select, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MainButton from "../../components/main-button/index";
import axios from "axios";
import Loding from "../../components/loding/Loding";
import Popup from "../../components/pop-up/Popup";
import Swal from "sweetalert2";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Cookie from "js-cookie";

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

  const [adminId , setAdminId] = useState(null)

  const [categoryId , setCategoryId] = useState(null)

  const getId = (id) => {
    setEditId(id);
  };
  
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
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/report",config);
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
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      report: addDataReport.report,
      type_report: addDataReport.type_report,
      admins_id: addDataReport.admins_id,
      categories_id: addDataReport.categories_id,
      start_date: addDataReport.start_date,
      end_date: addDataReport.end_date,
    };
    axios.post("http://127.0.0.1:8000/api/report", data ,config ).then((response) => {
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
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .patch(`http://127.0.0.1:8000/api/report/${editId}`, data,config)
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

  //get admin id

  const fetchIdData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin",config);
      setAdminId(response.data.message.data);
      console.log(response.data.message.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIdData();
  }, []);

  //get category id
  
  const fetchIdcategory = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category" , config);
      setCategoryId(response.data.message);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchIdcategory();
  }, []);
  
console.log(editDataReport)
 
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
            <InputLabel id="demo-simple-select-label">Add Type</InputLabel>
            <Select
              id="outlined-uncontrolled"
              label="Type"
              name="type_report"
              onChange={handleChange}
              >
                <MenuItem value={'weekly'}>weekly</MenuItem>
                <MenuItem value={'monthly'}>monthly</MenuItem>
                <MenuItem value={'yearly'}>yearly</MenuItem>
            
            </Select>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              id="outlined-read-only"
              label="Admin"
              name="admins_id"
              onChange={handleChange}
            >
              {adminId.map((ele)=>{
                return  <MenuItem value={ele.id}>{ele.first_name}</MenuItem>
              })}
            </Select>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              id="outlined-read-only"
              label="Category"
              name="categories_id"
              onChange={handleChange}
            >
                {categoryId.map((ele)=>{
                return  <MenuItem value={ele.id}>{ele.category}</MenuItem>
              })}
            </Select>
            <InputLabel>Start Date</InputLabel>
            <TextField
              id="outlined-read-only"
              name="start_date"
              onChange={handleChange}
              type="date"
            />
            <InputLabel>End Date</InputLabel>
            <TextField
              id="outlined-read-only"
              name="end_date"
              onChange={handleChange}
              type="date"
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
            <InputLabel id="demo-simple-select-label">Add Type</InputLabel>
            <Select
              id="outlined-uncontrolled"
              label="Type"
              name="type_report"
              onChange={handleEditChange}
              >
                <MenuItem value={'weekly'}>weekly</MenuItem>
                <MenuItem value={'monthly'}>monthly</MenuItem>
                <MenuItem value={'yearly'}>yearly</MenuItem>
            
            </Select>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              id="outlined-read-only"
              label="Admin"
              name="admins_id"
              onChange={handleEditChange}
            >
              {adminId.map((ele)=>{
                return  <MenuItem value={ele.id}>{ele.first_name}</MenuItem>
              })}
            </Select>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              id="outlined-read-only"
              label="Category"
              name="categories_id"
              onChange={handleEditChange}
            >
                {categoryId.map((ele)=>{
                return  <MenuItem value={ele.id}>{ele.category}</MenuItem>
              })}
            </Select>
            <InputLabel>Start Date</InputLabel>
            <TextField
              id="outlined-read-only"
              name="start_date"
              onChange={handleEditChange}
              type="date"
            />
            <InputLabel>End Date</InputLabel>
            <TextField
              id="outlined-read-only"
              name="end_date"
              onChange={handleEditChange}
              type="date"
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
