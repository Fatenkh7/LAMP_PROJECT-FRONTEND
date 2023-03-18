import React,{useState , useEffect}from "react";
import Report from "./repot";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { width } from "@mui/system";
import MainButton from "../../components/main-button/index";
import axios from "axios"
import Loding from "../../components/loding/Loding";


function ReportChart() {
  
  const [visibleAdd , setVisibleAdd] = useState(false)

  const [showEdit , setShowedit]= useState(false)

  const [dataReport ,setDataReport]=useState(null)

  const [addDataReport , setAddDataReport]=useState({
    report:'',
    type_report:'',
    admins_id:'',
    categories_id:'',
    start_date:'',
    end_date:''
  })

  
  

  const visibleEdit = () => {
    if (showEdit === false) {
        setShowedit(true);
    } else {
        setShowedit(false);
    }
};

  const show = ()=>{
    if(visibleAdd === false){
      setVisibleAdd(true)
    }
    else{
      setVisibleAdd(false)
    }
  }


  //get data

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/report");
      setDataReport(response.data.message.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(dataReport)

  //post data

  const handleChange = (e) => {
    const value = e.target.value;
    setAddDataReport({
      ...addDataReport,
      [e.target.name]: value,
    });
  };

  const handelSubmit=()=>{
    const data = {
      report:addDataReport.report,
      type_report:addDataReport.type_report,
      admins_id:addDataReport.admins_id,
      categories_id:addDataReport.categories_id,
      start_date:addDataReport.start_date,
      end_date:addDataReport.end_date,
    }
    axios.post("http://127.0.0.1:8000/api/report",data).then((response)=>{
      console.log(response)
      fetchData()
    })
  }



  if(!dataReport){return <div style={{display:"flex" , justifyContent:'center', height:'80%',alignItems:'center'}}><Loding/></div>}
  return (
    <div style={{width:"100%" , height:"84vh",position:"relative"}}>
    <div className="report">
 
    <div className="add-categories"style={{width:'90%'}}>
          <MainButton name="Add Category" onClick={show}  />
        </div>

      
        <div className="report-container">
        {dataReport.map((ele)=>{
          return <Report useEffect={fetchData} visibleEdit={visibleEdit} id={ele.id}  report={ele.report} type={ele.type_report} admin={ele.admins_id} category={ele.categories_id} start_date={ele.start_date} end_date={ele.end_date}/>
        })}
        </div>
      
    </div>
        {visibleAdd&&<div
            className="reports-close-popup"
          >
          
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
            sx={{width:'500px' , backgroundColor:'white'}}
          >
            <h2>Add Report</h2>
            <p onClick={show} style={{fontSize:'40px' , marginTop:'2px',marginBottom:'2px' }}>x</p>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Add Report"
                name="report"
                onChange={handleChange}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Add Type"
                name="type_report"
                onChange={handleChange}
              />
              <TextField
                id="outlined-read-only"
                label="Admin"
                name="admins_id"
                onChange={handleChange}
              />
              <TextField
                id="outlined-read-only"
                label="Category"
                name="categories_id"
                onChange={handleChange}
              />
              <TextField
                id="outlined-read-only"
                label="Start date"
                name="start_date"
                onChange={handleChange}
              />
              <TextField
                id="outlined-read-only"
                label="End date"
                name="end_date"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
                onClick={handelSubmit}
              >
                Submit
              </Button>
            </form>
          </Box>
          </div>}
          {showEdit&&<div
            className="reports-close-popup"
          >
          
          <Box
            className="add-categories-box"
            component="form"
            noValidate
            autoComplete="off"
            sx={{width:'500px' , backgroundColor:'white'}}
          >
            <h2>Edit Report</h2>
            <p  onClick={visibleEdit} style={{fontSize:'40px' , marginTop:'2px',marginBottom:'2px' }}>x</p>
            <form className="pop-up-form">
              <TextField
                id="outlined-controlled"
                label="Add Report"
                name="report"
              />
              <TextField
                id="outlined-uncontrolled"
                label="Add Type"
                name="type_report"
              />
              <TextField
                id="outlined-read-only"
                label="Admin"
                name="admins_id"
              />
              <TextField
                id="outlined-read-only"
                label="Category"
                name="categories_id"
              />
              <TextField
                id="outlined-read-only"
                label="Start date"
                name="start_date"
              />
              <TextField
                id="outlined-read-only"
                label="End date"
                name="end_date"
              />
              <Button
                variant="contained"
                disableElevation
                style={{ height: 55 }}
                sx={{ backgroundColor: "#3d0066" }}
              >
                Submit
              </Button>
            </form>
          </Box>
          </div>}
    </div>
  );
}

export default ReportChart;
