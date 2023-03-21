import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DataTable(props) {
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      // checkboxSelection
      sx={{
        border: "none",
      }}
      headerStyle={{ backgroundColor: "#3d0066" }}
    />
  );
}

export default DataTable;
