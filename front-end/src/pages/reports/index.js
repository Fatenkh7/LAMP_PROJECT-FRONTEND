import React from "react";
import Report from "./repot";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { width } from "@mui/system";


function ReportChart() {
  const data = [
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
    {
      report: "hello ",
      type: "hi",
      admin: "mazen",
      category: "wood",
      start_date: 1999,
      end_date: 2015,
    },
  ];

  return (
    <div style={{width:"100%" , height:"84vh",position:"relative"}}>
    <div className="report">
      <Button
        sx={{
          color: "#3d0066",
          display: "flex",
          justifyContent: "flex-start",
          width: 50,
        }}
      >
        <PostAddIcon
          sx={{
            fontSize: "50px",
            color: "#3d0066",
          }}
        />
      </Button>
      
        <div className="report-container">
        {data.map((ele)=>{
          return <Report report={ele.report} type={ele.type} admin={ele.admin} category={ele.category} start_date={ele.start_date} end_date={ele.end_date}/>
        })}
        </div>
      
    </div>
        <div
            className="reports-close-popup"
          >
          
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Add Report</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Add Report"
                name="report"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Add Type"
                name="type_report"
              />
              <TextField
                id="outlined-read-only"
                label="Admin"
                name="admins_id"
              />
              <TextField
                id="outlined-read-only"
                label="Category"
                name="categories_id"
              />
              <TextField
                id="outlined-read-only"
                label="Start date"
                name="start_date"
              />
              <TextField
                id="outlined-read-only"
                label="End date"
                name="end_date"
              />
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
              >
                Submit
              </Button>
            </form>
          </Box>
          </div>
    </div>
  );
}

export default ReportChart;
