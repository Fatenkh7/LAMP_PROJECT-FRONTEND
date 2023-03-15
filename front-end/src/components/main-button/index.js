import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";

function MainButton(props) {
  return (
    <button className="main-button-component" onClick={props.onClick}>
      <AddIcon className="main-button-component-icon" />
      {props.name}
    </button>
  );
}

export default MainButton;
