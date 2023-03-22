import React, { useState } from "react";
import "./reports.css";
import { CSSTransition } from "react-transition-group";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import Reports from "./index.js";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
function Report(props) {
  const [report, setReport] = useState(false);
  const [padding, setPadding] = useState("20px");
  const [id, setId] = useState(null);

  // console.log(id)

  const visible = () => {
    if (report === false || padding === "20px") {
      setReport(true);
      setPadding(0);
    } else {
      setReport(false);
      setPadding("20px");
    }
  };

  //delete
  const handelDelete = () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios.delete(`http://127.0.0.1:8000/api/report/${id}`,config).then((response) => {
      console.log(response);
      props.useEffect();
    });
    Swal.fire("Deleted!", "Your admin has been deleted.", "success");
  };

  return (
    <div>
      {false && <Reports />}
      <div
        className="card-report"
        onMouseEnter={visible}
        onMouseLeave={visible}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: `${padding}`,
          }}
        >
          <div
            className="title-report"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h3>Report : {props.report}</h3>
              <h4>Type : {props.type}</h4>
            </div>
            <div
              style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ minWidth: 20, color: "#3d0066" }}
                onClick={props.visibleEdit}
                onMouseEnter={() => {
                  props.getId(props.id);
                }}
              >
                <EditIcon />
              </Button>

              <Button
                sx={{ minWidth: 20, color: "#3d0066" }}
                onMouseEnter={() => {
                  setId(props.id);
                }}
                onClick={handelDelete}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>

        {report && (
          <div className="more-info">
            <p>
              <strong>admin : </strong>
              {props.admin}
            </p>
            <p>
              <strong>category : </strong>
              {props.category}
            </p>
            <p>
              <strong>Start date : </strong>
              {props.start_date}
            </p>
            <p>
              <strong>End date : </strong>
              {props.end_date}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
