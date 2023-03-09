import React from "react";
import { useState } from "react";

function PopUp(props) {
  return (
    <div className="admin-hide-back">
      <div className="admin-add-card">
        {props.children}
        {/* <button className="admin-close-btn" onClick={() => setVisible(false)}>
          x
        </button>
        <h2>{props.name} Admin</h2>
        <div className="admin-add-card-content">
          <div>
            <input type="text" placeholder="First Name" />
          </div>
          <div>
            <input type="text" placeholder="Last Name" />
          </div>
          <div>
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <input type="username" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div className="add-admin-btns-container">
            <button
              className="admin-add-cancel-btn"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button className="admin-add-save-btn">Save</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PopUp;
