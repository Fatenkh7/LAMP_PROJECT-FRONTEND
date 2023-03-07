import * as React from "react";
import NavBar from "./components/navbar/index";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./App.css";

export default function App() {
  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <NavBar />
      <Outlet />
    </Grid>
  );
}
