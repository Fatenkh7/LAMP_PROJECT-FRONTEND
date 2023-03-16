// // import React from "react";
// // import Grid from "@mui/material/Grid";

// // function Admins() {
// //   return <div>Admins</div>;
// // }

// // export default Admins;

// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
import "./style.css";
// import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PopUp from "../../components/popup/index";
import Popup from "../../components/pop-up/Popup";
import CloseIcon from "@mui/icons-material/Close";
// import TextField from "@mui/material/TextField";
// import { Box } from "@mui/material";
import DataTable from "../../components/data-table/index";
import MainButton from "../../components/main-button/index";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function Admins({ onAddAdmin }) {

//   const [admins, setAdmins] = useState([]);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     is_super: "",
//     password: "",
//   });
//   const [data, setData] = useState([]);

//   const handleUpdate = (updatedAdmin) => {
//     const { ...updatedValues } = updatedAdmin.values;
//     Swal.fire({
//       title: "Are you sure you want to edit this Admin?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update it",
//       cancelButtonText: "No, cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .post(`http://locahost:8000/api/admin/${updatedAdmin.values.id}`, {
//             ...updatedValues,
//             _method: "PUT",
//           })
//           .then((response) => {
//             console.log(response.data);
//             Swal.fire({
//               icon: "success",
//               title: "Admin Updated Successfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           })
//           .catch((error) => {
//             console.log(error);
//             Swal.fire({
//               icon: "error",
//               title: "Update Failed",
//               text: error.message,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           });
//       }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:8000/api/admin", {
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         username: formData.username,
//         is_super: formData.is_super,
//         email: formData.email,
//         password: formData.password,
//       })
//       .then((response) => {
//         console.log(response.data);
//         setData([...data, response.data]);
//         setFormData({
//           first_name: "",
//           last_name: "",
//           username: "",
//           is_super: "",
//           email: "",
//           password: "",
//         });
//         setAddPop(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="admin-data">
//       {addPop && (
//         <Popup close={closePop}>
//           <div
//             className="currencies-close-popup"
//             onClick={() => {
//               setAddPop(false);
//             }}
//           >
//             <CloseIcon />
//           </div>
//           <Box
//             className="add-currency-box"
//             component="form"
//             noValidate
//             autoComplete="off"
//           >
//             <h2>Add Admin</h2>
//             <form className="pop-up-form">
//               <TextField
//                 id="outlined-controlled"
//                 label="First Name"
//                 color="secondary"
//                 onChange={handleChange}
//               />
//               <TextField
//                 id="outlined-uncontrolled"
//                 label="Last Name"
//                 color="secondary"
//                 onChange={handleChange}
//               />
//               <TextField
//                 id="outlined-uncontrolled"
//                 label="Username"
//                 color="secondary"
//                 onChange={handleChange}
//               />
//               <TextField
//                 id="outlined-uncontrolled"
//                 label="Email"
//                 color="secondary"
//                 onChange={handleChange}
//               />
//               <TextField
//                 id="outlined-uncontrolled"
//                 label="Password"
//                 color="secondary"
//                 onChange={handleChange}
//               />
//               <button
//                 variant="contained"
//                 disableElevation
//                 style={{ height: 55 }}
//                 sx={{ backgroundColor: "#3d0066" }}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </form>
//           </Box>
//         </Popup>
//       )}
//       {editPop && (
//         <Popup close={closePop}>
//           <div
//             className="currencies-close-popup"
//             onClick={() => {
//               setEditPop(false);
//             }}
//           >
//             <CloseIcon />
//           </div>
//           <Box
//             className="add-currency-box"
//             component="form"

//             noValidate
//             autoComplete="off"
//           >
//             <h2>Edit Admin</h2>
//             <TextField
//               id="outlined-controlled"
//               label="First Name"
//               color="secondary"
//               onChange={handleChange}
//             />
//             <TextField
//               id="outlined-uncontrolled"
//               label="Last Name"
//               color="secondary"
//               onChange={handleChange}
//             />
//             <TextField
//               id="outlined-uncontrolled"
//               label="Username"
//               color="secondary"
//               onChange={handleChange}
//             />
//             <TextField
//               id="outlined-uncontrolled"
//               label="Email"
//               color="secondary"
//               onChange={handleChange}
//             />
//             <TextField
//               id="outlined-uncontrolled"
//               label="Password"
//               color="secondary"
//               onChange={handleChange}
//             />
//             <Button
//               variant="contained"
//               disableElevation
//               style={{ height: 55 }}
//               sx={{ backgroundColor: "#3d0066" }}

//               onClick={handleUpdate}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Popup>
//       )}
//       <div style={{}} className="pages-container">
//         <div className="admin-add-button">
//           <MainButton name="Add Admin" onClick={() => setAddPop(true)} />
//         </div>
//         <DataTable rows={admins} columns={columns} />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style.css";

import axios from "axios";
import MaterialReactTable from "material-react-table";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function Admins() {
  const [data, setData] = useState([]);
  const [formattedColumns, setColumns] = useState([]);

  const [open, setOpen] = useState(false);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First name",
      width: 130,
    },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "is_super", headerName: "Is Super", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 160,
    },
    {
      field: "password",
      headerName: "Password",
      width: 160,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <div>
          <EditIcon
            sx={{ color: "#3d0066" }}
            onClick={() => setEditPop(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <div>
          <DeleteIcon
            sx={{ color: "#3d0066" }}
            style={{ cursor: "pointer" }}
            onClick={handleDelete(data.id)}
          />
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin");
      setData(response.data.message.data);
      console.log(response.data.message.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   axios
  //   .get("http://localhost:8000/api/admin")
  //   .then((response) => {
  //       console.log(response.data.message.data);
  //       if (response.data && Array.isArray(response.data.message.data)) {
  //         const formattedColumns = [
  //           {
  //             accessorKey: "id",
  //             header: "ID",
  //             type: "numeric",
  //             enableEditing: false,
  //           },
  //           { accessorKey: "first_name", header: "First Name" },
  //           { accessorKey: "last_name", header: "Last Name" },
  //           { accessorKey: "username", header: "Username" },
  //           { accessorKey: "is_super", header: "Is Super" },
  //           { accessorKey: "email", header: "Email", type: "unique" },
  //           { accessorKey: "password", header: "Password" },
  //         ];

  //         setColumns(formattedColumns);
  //         setData(response.data.message.data);
  //         console.log(data);
  //       } else {
  //         console.error("Invalid response format");
  //         setData([]);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // const handleUpdate = (updatedRow) => {
  //   const { ...updatedValues } = updatedRow.values;

  //   Swal.fire({
  //     title: "Are you sure you want to edit this user?",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, update it",
  //     cancelButtonText: "No, cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .post(`http://localhost:8000/api/admin/${updatedRow.values.id}`, {
  //           ...updatedValues,
  //           _method: "PUT",
  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //           Swal.fire({
  //             icon: "success",
  //             title: "Update successful",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           Swal.fire({
  //             icon: "error",
  //             title: "Update failed",
  //             text: error.message,
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         });
  //     }
  //   });
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/admin/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Delete successful",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Delete failed",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  // const AddAdminForm = () => {
  //   const [admin, setAdmin] = useState({
  //     first_name: "",
  //     last_name: "",
  //     username: "",
  //     is_super: "",
  //     email: "",
  //     password: "",
  //   });
  //   const [isDisabled, setIsDisabled] = useState(true);
  //   const handleFormChange = (event) => {
  //     const { name, value } = event.target;
  //     setAdmin((prevState) => ({ ...prevState, [name]: value }));
  //   };

  //   useEffect(() => {
  //     setIsDisabled(
  //       admin.first_name === "" ||
  //         admin.last_name === "" ||
  //         admin.username === "" ||
  //         admin.email === "" ||
  //         admin.password === "" ||
  //         admin.is_super === ""
  //     );
  //   }, [
  //     admin.first_name,
  //     admin.last_name,
  //     admin.username,
  //     admin.is_super,
  //     admin.email,
  //     admin.password,
  //   ]);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     axios
  //       .post("http://localhost:8000/api/admin", {
  //         first_name: admin.first_name,
  //         last_name: admin.last_name,
  //         username: admin.username,
  //         is_super: admin.is_super,
  //         email: admin.email,
  //         password: admin.password,
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setData([...data, response.data]);
  //         setAdmin({
  //           first_name: "",
  //           last_name: "",
  //           username: "",
  //           is_super: "",
  //           email: "",
  //           password: "",
  //         });
  //         setOpen(false);
  //       });
  //   };

  return (
    // <Dialog open={open} onClose={() => setOpen(false)}>
    //   <DialogTitle>Add New admin</DialogTitle>
    //   <DialogContent>
    //     <TextField
    //       label="First Name"
    //       name="first_name"
    //       // value={admin.name}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="Last Name"
    //       name="last_name"
    //       // value={admin.name}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="Username"
    //       name="username"
    //       // value={admin.name}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="Is Super"
    //       name="is_super"
    //       // value={admin.name}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="email"
    //       name="email"
    //       // value={admin.email}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="password"
    //       name="password"
    //       // value={admin.password}
    //       onChange={handleFormChange}
    //       fullWidth
    //       required
    //       sx={{ mb: 2 }}
    //     />
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={() => setOpen(false)}>Cancel</Button>
    //     <Button onClick={handleSubmit} disabled={isDisabled}>
    //       Add
    //     </Button>{" "}
    //   </DialogActions>
    // </Dialog>
    <div className="admin-data">
      {addPop && (
        <Popup close={closePop}>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setAddPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-currency-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Add Admin</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="First Name"
                color="secondary"
                // onChange={handleFormChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Last Name"
                color="secondary"
                // onChange={handleFormChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Username"
                color="secondary"
                // onChange={handleFormChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Email"
                color="secondary"
                // onChange={handleFormChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Password"
                color="secondary"
                // onChange={handleFormChange}
              />
              <button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </Box>
        </Popup>
      )}
      {editPop && (
        <Popup close={closePop}>
          <div
            className="currencies-close-popup"
            onClick={() => {
              setEditPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-currency-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Edit Admin</h2>
            <TextField
              id="outlined-controlled"
              label="First Name"
              color="secondary"
              // onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Last Name"
              color="secondary"
              // onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Username"
              color="secondary"
              // onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              color="secondary"
              // onChange={handleFormChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Password"
              color="secondary"
              // onChange={handleFormChange}
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              // onClick={handleUpdate}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      )}
      <div style={{}} className="pages-container">
        <div className="admin-add-button">
          <MainButton name="Add Admin" onClick={() => setAddPop(true)} />
        </div>
        <DataTable rows={data} columns={columns} />
      </div>
    </div>
  );
}

//   const [rowAdmin, setRowAdmin] = useState({});

//   useEffect(() => {}, [rowAdmin]);

//   const tableInstanceRef = useRef(null);

//   const someEventHandler = () => {
//     console.log(tableInstanceRef.current.getState().sorting);
//   };

//   return (
//     <>
//       <div className="table-container">
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             style={{ backgroundColor: "#3d0066" }}
//             onClick={() => setOpen(true)}
//           >
//             Add Admin
//             <AddIcon style={{ marginLeft: "0.5em" }} />
//           </Button>
//         </Box>
//         <MaterialReactTable
//           columns={formattedColumns}
//           data={data}
//           enableColumnOrdering
//           enablePagination={true}
//           tableInstanceRef={tableInstanceRef}
//           enableRowActions
//           renderRowActionMenuItems={({ row }) => {
//             const admin = row.original;
//             return [
//               <MenuItem
//                 key={`delete-${admin.id}`}
//                 onClick={() => handleDelete(admin.id)}
//                 sx={{ pl: "10px" }}
//               >
//                 <IconButton size="small" sx={{ mr: 1.5 }}>
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//                 Delete
//               </MenuItem>,
//             ];
//           }}
//           editingMode="row"
//           enableEditing
//           onEditingRowSave={handleUpdate}
//         />
//         <AddAdminForm />
//       </div>
//     </>
//   );
// }

// export default Sections;

export default Admins;
