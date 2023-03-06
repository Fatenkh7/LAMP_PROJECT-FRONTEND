import React from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./navbarItems";
import { bottomNavbarItems } from "./navbarItems";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();

  const close = () => {
    document.querySelector(".MuiDrawer-paper ").classList.toggle("close");
  };

  return (
    <Drawer
      sx={navbarStyles.drawer}
      variant="permanent"
      anchor="left"
      className="close"
    >
      <i className="toggle sidebar-button" onClick={close}>
        <KeyboardArrowLeftRoundedIcon />
      </i>
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <ListItem button key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={navbarStyles.icons} className="sidebar-nav-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText
              sx={navbarStyles.text}
              primary={item.label}
              className="sidebar-nav-text"
            />
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem button onClick={() => navigate(mainNavbarItems.route)}>
          <ListItemIcon sx={navbarStyles.icons} className="sidebar-nav-icon">
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText sx={navbarStyles.text} className="sidebar-nav-text">
            Logout
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavBar;
