import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material";
import { Box, color, width } from "@mui/system";
import Cards from "./Profit_goals.js";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import './Box.css'

const profit = [
  {
    id: 1,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 1,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 1,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 1,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 1,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },{
    id: 2,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 3,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 4,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
  {
    id: 5,
    title: "hbibi",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
  },
];

function ProfitGoal() {
  const [visible, setvisible] = useState(false);

  const [visibleEdit, setvisibleEdit] = useState(false);

  const isvisibleForIcon =()=>{
    if (visible === false){
      setvisible(true)
    }else{
        setvisible(false)
    }
  }

   const isvisibleEdit= ()=>{
    if (visible === false){
      setvisibleEdit(true)
    }else{
        setvisibleEdit(false)
    }
  }
      
  return (
    <Box>
      <Box
        sx={{

          width: "97%",
          height: "87.5vh",
          overflowY : 'scroll',
          backgroundColor: "transparent",
          borderRadius: "20px",
          margin: "0px 0px 0px 20px ",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "83vh",
            padding: "10px 0px 0px 50px",
          }}
        >
          <Button
            onClick = {isvisibleForIcon} sx={{color:"#3d0066" ,marginBottom:'15px'}} >
        <PostAddIcon
             sx={{
              fontSize: "50px",color:"#3d0066" }}
        />
        </Button>
          <div
            className="cardsContainer"
            style={{gap:20}}
          >
            
            {profit.map((ele) => {
              return (
                <div className="sampleContainer">
                <Cards
                  
                  title={ele.title}
                  description={ele.description}
                  id={ele.id}
                  edit = {isvisibleEdit}
                />
                </div>
              );
            })}
            
          </div>
        </Box>
        

        {visible&&
          <div className="hide-back">
            <Box
              sx={{
                width: "500px",
                height: "300px",
                backgroundColor: "rgb(255,255,255)",
                borderRadius: "20px",
                // position: "fixed",
                // top: "30%",
                // left: "42%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginTop: "25px",
                  gap:'20px'
                }}
              >
                <Box sx={{display : 'flex' , justifyContent:'space-between'}}>
                <Typography variant="h4"> Add Cards</Typography>
                <Button sx={{color : '#3d0066'}} onClick={isvisibleForIcon}>
                < CancelPresentationRoundedIcon sx={{fontSize:'40px'}}/>
                </Button>
                </Box>
                <TextField
                  id="title"
                  label="title"
                  variant="filled"
                  
                />
                <TextField
                  id="description"
                  label="description"
                  variant="filled"
                  
                />
                <Button  variant="outlined" sx={{color:'#3d0066' , borderColor:'#3d0066' }}  endIcon={<SendIcon />} onClick={()=>{setvisible(false)}}>
                  Send
                </Button>
              </Box>
            </Box>
          </div>}
          {visibleEdit&&<div className="hide-back">
            <Box
              sx={{
                width: "500px",
                height: "300px",
                backgroundColor: "rgb(255,255,255)",
                borderRadius: "20px",
                // position: "fixed",
                // top: "30%",
                // left: "42%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginTop: "25px",
                  gap:'20px'
                }}
              >
                <Box sx={{display : 'flex' , justifyContent:'space-between'}}>
                <Typography variant="h4"> Edit Cards</Typography>
                <Button sx={{color : '#3d0066'}} onClick={()=>{
                  setvisibleEdit(false)
                }}>
                < CancelPresentationRoundedIcon sx={{fontSize:'40px'}}/>
                </Button>
                </Box>
                <TextField
                  id="title"
                  label="title"
                  variant="filled"
                  
                />
                <TextField
                  id="description"
                  label="description"
                  variant="filled"
                  
                />
                <Button  variant="outlined" sx={{color:'#3d0066' , borderColor:'#3d0066' }}  endIcon={<SendIcon />} onClick={()=>{setvisible(false)}}>
                  Send
                </Button>
              </Box>
            </Box>
          </div>}
          
          
      </Box>
    </Box>
  );
}
export default ProfitGoal;
