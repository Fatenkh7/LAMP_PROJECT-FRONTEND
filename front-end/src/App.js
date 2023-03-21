import * as React from "react";
import NavBar from "./components/navbar/index";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./App.css";
import Header from "./components/header/index";
import Loading from "./components/loding/Loding";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
