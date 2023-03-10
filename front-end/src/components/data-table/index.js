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
        border: "1px solid #3d0066",
        borderRadius: "20px",
        boxShadow: "0 2px 15px rgba(0,0,0,0.4)",
      }}
    />
  );
}

export default DataTable;
