import React from "react";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material"
import { Box, color, width } from "@mui/system";
import Paper from '@mui/material/Paper';
import "./dashboard.css";

import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"


import { useState } from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const Data = [
  { argument: '2000', value: 1200 },
  { argument: '2005', value: 2000 },
  { argument: '2010', value: 1700 },
  { argument: '2015', value: 2500 },
  { argument: '2020', value: 1200 },
  { argument: '2023', value: 10000 },
];

const admins =[
  {name:"mazen"},
  {name:"mohamd"},
  {name:"abdlatif"},
  {name:"faten"},
  {name:"mazen"},
  {name:"mohamd"},
  {name:"abdlatif"},
  {name:"faten"},  
  {name:"mazen"},
  {name:"mohamd"},
  {name:"abdlatif"},
  {name:"faten"},
];

const userdata = [{
  id:1,
  year:2012,
  usergain:200,
  userlose:40
},{
  id:2,
  year:2013,
  usergain:300,
  userlose:30
},{
  id:3,
  year:2014,
  usergain:250,
  userlose:150
},{
  id:4,
  year:2015,
  usergain:100,
  userlose:86
},{
  id:5,
  year:2016,
  usergain:150,
  userlose:178
},{
  id:6,
  year:2017,
  usergain:600,
  userlose:100
},{
  id:7,
  year:2018,
  usergain:200,
  userlose:20
},{
  id:8,
  year:2019,
  usergain:100,
  userlose:90
},{
  id:9,
  year:2020,
  usergain:50,
  userlose:80
},{
  id:10,
  year:2021,
  usergain:100,
  userlose:73
},{id:11,
year:2022,
usergain:30,
userlose:270
},{
  id:12,
year:2023,
usergain:150,
userlose:110
}]
console.log()

function ProfitGoal() {

  /*************************** */
  const [userData,setUserData] = useState({
    labels:userdata.map((data)=>data.year),
    
    datasets :[{
      label:'fixed transaction',
      data:userdata.map((data)=>data.usergain),
      backgroundColor:"#3d0066"
    },{
      label:'Recurring transaction',
      data:userdata.map((data)=>data.userlose),
      backgroundColor:"#1f0099"
    }]
  })
  console.log(userData)
  /*************************** */

  return (
    
    <Box sx={{
    width:'97%',

    borderRadius:'20px',
    margin:'20px 20px 20px 20px '}}>
    <div className="ContentReports">
    <div className="First-Section" style={{display:"flex" , justifyContent:'center' , alignItems:'center'}} >
      <div style={{width:'90%' , height:'84%',display:"flex",flexDirection:'column'}}>
        
          <h2 style={{fontSize:'40px',margin:'10px 0 10px 0'}}>Financial app</h2>
          <div className="scroll-title">
          <p style={{fontSize:'27px'}}>Financial Application means a written document filed with the authority by an applicant for the purpose of evaluating the applicant's qualifications and proposed project or projects for types of financial assistance which may be provided by the board under the act.</p>
          </div>
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
        {admins.map((ele)=>{
          return <Box sx={{display:'flex' ,justifyContent:'center',  alignItems:'center',borderBottom:'1px solid #c9c9c9', backgroundColor:"f0f0f0" ,height:'40px' , width:"90%" }}>
            <p style={{fontSize:'25px'}}>{ele.name}</p>
          </Box>
        })}
        </div>
      </Box>

    </div>
    <div className="Fourth-Section" style={{display:"flex" , justifyContent:'center' , alignItems:'center'}}>
    <Box sx={{backgroundColor:'white' ,height: ' 83.5%' , width :'90%', borderRadius:'5px'  ,display :'flex' ,flexDirection:'column' , alignItems:'center', boxShadow : '0.2px 0.5px 4px'}}>
      
        <Bar data={userData} height={400} width={900}/>
      
    </Box>
    </div>
    </div>
    </Box>
    
  );
}

export default ProfitGoal;
