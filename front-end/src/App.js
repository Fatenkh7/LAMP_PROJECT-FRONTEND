import * as React from "react";
import NavBar from "./components/navbar/index";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";

export default function App() {
  return (
    <Grid container>
      <NavBar />
      <Outlet />
    </Grid>
  );
}
