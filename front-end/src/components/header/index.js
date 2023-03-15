import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountRoundedIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import "./style.css";

function Header() {
  return (
    <div style={{ width: "100%" }}>
      <header className="main-header">
        <div className="header-icons">
          <div>
            <AccountRoundedIcon />
          </div>
          <div>
            <span className="main-header-admin-name">AbdellatifAlKerde</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
