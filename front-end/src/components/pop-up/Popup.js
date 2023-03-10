import * as React from "react";
import "./Popup.css";

export default function Popup(props) {
  return (
    <div className="popup-overlay">
      <div className="popup-body">{props.children}</div>
    </div>
  );
}
