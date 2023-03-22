import React from "react";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material"
import { Box, color, width } from "@mui/system";
import Paper from '@mui/material/Paper';
import "./dashboard.css";
import {CircularProgressbar ,buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';  
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"
import axios from "axios";
import Cookie from "js-cookie";


import { useState ,useEffect } from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Loding from "../../components/loding/Loding";





function ProfitGoal() {

  /*************************** */
  const [recurring,setRecurring] =useState(null)
   
   const [fixed,setFixed] = useState(null)
  /*************************** */

  const [admin,setAdmin] =useState(null)

  const fetchData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin",config);
      setAdmin(response.data.message);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

console.log(admin)

  const fetchRecurringData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/recurringTransaction",config);
      setRecurring(response.data.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchFixedData = async () => {
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/fixedtransaction",config);
      setFixed(response.data.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchRecurringData()
    fetchFixedData()
  }, []);


   

  const Data = [
    { argument: '2000', value: 1200 },
    { argument: '2005', value: 2000 },
    { argument: '2010', value: 1700 },
    { argument: '2015', value: 2500 },
    { argument: '2020', value: 1200 },
    { argument: '2023', value: 10000 },
  ];



  const percentage = 66


  if (!admin  || !recurring  || !fixed  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          alignItems: "center",
        }}
      >
        <Loding />
      </div>
    );
  }
  return (
    
    <Box sx={{
    width:'97%',

    borderRadius:'20px',
    margin:'auto'}}>
    <div className="ContentReports">
    <div className="First-Section" style={{display:"flex" , justifyContent:'center' , alignItems:'center'}} >
      <div style={{width:'90%' , height:'84%',display:"flex",flexDirection:'column'}}>
        
      <CircularProgressbar styles={buildStyles({
            pathColor: `#3d0066`,
            textColor: '#3d0066',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
      })} value={percentage} text={`${percentage}%`}/>



      </div>
    </div>
    <div className="Second-Section" style={{display:'flex' , justifyContent:"center"}}>
    <div style={{width:'97%' }}>
    <Box sx={{ margin:' 30px 30px' , boxShadow : '0.2px 0.5px 4px'}}>
    {/* <Paper  sx={{width:'20rem' , height:'5rem' }}>
      <Typography variant="h4" align="center">Profit</Typography>
    </Paper> */}
    
    <Paper >
    <Chart
      data={Data}
      height={310}
      
    >
      <ArgumentAxis />
      <ValueAxis />

      <LineSeries valueField="value" argumentField="argument" />
      <Animation/>
    </Chart>
    
    </Paper>
    </Box>
    </div>
    </div>
    <div className="Third-Section" style={{display : "flex" , justifyContent : 'center' , alignItems:"center" }}>
      <Box sx={{backgroundColor:'white' ,height: ' 83.5%' , width :'90%', borderRadius:'5px'  ,display :'flex' ,flexDirection:'column' , alignItems:'center' , boxShadow : '0.2px 0.5px 4px'}}>
        <Box sx={{width:'90%' ,display:'flex' ,alignItems:'center', flexDirection:'column' , gap:'10px' }}>
            <Box sx={{display:'flex' ,justifyContent:'center' ,backgroundColor:"#3d0066" ,margin:'10px 9px 10px 8px' , width:"99.5%",borderRadius:"5px"}}>
              <h3 style={{color:"white"}}>Admins</h3>
            </Box>
        </Box>
        < div className="scroll-admins" style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:"center", flexDirection:"column" }}>
        {admin.map((ele)=>{
          return <Box sx={{display:'flex' ,justifyContent:'center',  alignItems:'center',borderBottom:'1px solid #c9c9c9', backgroundColor:"f0f0f0" ,height:'40px' , width:"90%" }}>
            <p style={{fontSize:'25px'}}>{ele.first_name}</p>
          </Box>
        })}
        </div>
      </Box>

    </div>
    <div className="Fourth-Section" style={{display:"flex" , justifyContent:'center' , alignItems:'center'}}>
    <Box sx={{backgroundColor:'white' ,height: ' 83.5%' , width :'90%', borderRadius:'5px'  ,display :'flex' ,flexDirection:'column' , alignItems:'center', boxShadow : '0.2px 0.5px 4px'}}>
      
    <Bar data={{
    labels:fixed.map((data)=>data.date_time),
    
    datasets :[{
      label:'fixed transaction',
      data:fixed.map((data)=>data.amount),
      backgroundColor:"#3d0066"
    },{
      label:'Recurring transaction',
      data:recurring.map((data)=>data.amount),
      backgroundColor:"#1f0099"
    }]
  }} height={400} width={900}/>
      
    </Box>
    </div>
    </div>
    </Box>
    
  );
}

export default ProfitGoal;
