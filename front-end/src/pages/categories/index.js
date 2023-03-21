import * as React from "react"; 
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import "./Categories.css";
import { Box } from "@mui/material";
import Popup from "../../components/pop-up/Popup";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import DataTable from "../../components/data-table/index";
import MainButton from "../../components/main-button/index";
import axios from "axios";
import Swal from "sweetalert2";
import Loding from "../../components/loding/Loding";
import Cookie from "js-cookie"

export default function Categories() {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [Categories, setCategory] = useState(null);
  const [id, setId] = useState();

  const [DataCategory, setDataCategory] = useState({
    category: "",
    category_description: "",
    admins_id: "",
  });
  const [editCategory, setEditCategory] = useState({
    category: "",
    category_description: "",
  });

  function Delete(param) {

    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3d0066",
      cancelButtonColor: "#3d0066",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/category/id/${param}`,config)
          .then((response) => {
            console.log(response.status, response.data);
            fetchData();
            Swal.fire({
              title: "Delete Successfully",
              confirmButtonColor: "#3d0066",
              icon: "success",
              iconColor: "#3d0066",
            });
          });
      }
    });
  }

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const columns = [
    { field: "category", headerName: "Category", width: 300 },
    { field: "category_description", headerName: "Description", width: 300 },

    {
      field: "delete",
      headerName: "Delete",
      width: 100,

      renderCell: (params) => (
        <DeleteIcon
          sx={{ color: "#3d0066" }}
          style={{ cursor: "pointer" }}
          onClick={() => {
            Delete(params.id);
          }}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <div>
          <EditIcon
            onClick={() => {
              setEditPop(true);
              setId(params.id);
            }}
            sx={{ color: "#3d0066" }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  // fetch for get data

  const fetchData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category" , config);
      setCategory(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // fetch for add data
  const handleChange = (e) => {
    const value = e.target.value;
    setDataCategory({
      ...DataCategory,
      [e.target.name]: value,
    });
  };
  const handleChangeedit = (e) => {
    const value = e.target.value;
    setEditCategory({
      ...editCategory,
      [e.target.name]: value,
    });
  };
  console.log(DataCategory);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const userData = {
      category: DataCategory.category,
      category_description: DataCategory.category_description,
      admins_id: DataCategory.admins_id,
    };
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .post("http://localhost:8000/api/category", userData , config)
      .then((response) => {
        console.log(response.status, response.data);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Added Successfully",
      showConfirmButton: false,
      timer: 1500,
      iconColor: "#3d0066",
    });
  };
  //fetch for edit data
  const edit = () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .patch(`http://localhost:8000/api/category/id/${id}`, {
        category: editCategory.category,
        category_description: editCategory.category_description,
      },config)
      .then((response) => {
        console.log(response.status, response.data);
        fetchData();
      });
    Swal.fire({
      icon: "success",
      title: "Edit Successfully",
      showConfirmButton: false,
      timer: 1500,
      iconColor: "#3d0066",
    });
  };
  console.log(id);


  if(!Categories){return <div style={{display:"flex" , justifyContent:'center', height:'80%',alignItems:'center'}}><Loding/></div>  }
  
  return (
    <div className="categories-container">
      <div
        style={{
          height: 600,
          width: 1000,
        }}
      >
        <div className="add-categories">
          <MainButton name="Add Category" onClick={() => setAddPop(true)} />
        </div>
        <DataTable rows={Categories} columns={columns} />
        {/* </div> */}
      </div>
      {addPop && (
        <Popup close={closePop}>
          <div
            className="categories-close-popup"
            onClick={() => {
              setAddPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
          >
            <h2>Add Category</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Add Category"
                name="category"
                onChange={handleChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Add Description"
                name="category_description"
                onChange={handleChange}
              />
              <div className="categories-admin">
                <TextField
                  id="outlined-read-only"
                  label="Admin"
                  readOnly
                  name="admins_id"
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  disableElevation
                  style={{ height: 55 }}
                  sx={{ backgroundColor: "#3d0066" }}
                >
                  Assign to me
                </Button>
              </div>
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
                onClick={() => {
                  setAddPop(false);
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Popup>
      )}
      {editPop && (
        <Popup close={closePop}>
          <div
            className="categories-close-popup"
            onClick={() => {
              setEditPop(false);
            }}
          >
            <CloseIcon />
          </div>
          <Box
            className="add-categories-box"
            component="form"
            // sx={{
            //   '& > :not(style)': { m: 1, width: '25ch' },
            // }}
            noValidate
            autoComplete="off"
          >
            <h2>Edit Category</h2>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Add Category"
                name="category"
                onChange={handleChangeedit}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Add description"
                name="category_description"
                onChange={handleChangeedit}
              />
              <Button
                variant="contained"
                disableElevation
                sx={{ backgroundColor: "#3d0066" }}
                style={{ height: 55 }}
                onClick={() => {
                  setEditPop(false);
                  edit();
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Popup>
      )}
    </div>
  );
}