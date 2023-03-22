import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material";
import { Box, color, width } from "@mui/system";
import Cards from "./Profit_goals.js";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import "./Box.css";
import axios from "axios";
import Cookie from "js-cookie";
import Loding from "../../components/loding/Loding.js";


function ProfitGoal() {
  const [visible, setvisible] = useState(false);

  const [visibleEdit, setvisibleEdit] = useState(false);
  
    const [profitData,setProfitData] = useState(null)
    const [DataProfit ,setDataProfit] = useState({
      goal_title:'',
      goal_description:'',
      goal_amount:'',
      currencies_id:'',
      admins_id:'',
      start_date:'',
      end_date:'',
      })

      const [DataEditProfit ,setDataEditProfit] = useState({
        goal_title:'',
        goal_description:'',
        goal_amount:'',
        currencies_id:'',
        admins_id:'',
        start_date:'',
        end_date:'',
        })
  
      const [profitId ,setProfitId] = useState(null)

      const getId=(id)=>{
        setProfitId(id)
      }
  console.log(profitId)
  const isvisibleForIcon = () => {
    if (visible === false) {
      setvisible(true);
    } else {
      setvisible(false);
    }
  };

  const isvisibleEdit = () => {
    if (visible === false) {
      setvisibleEdit(true);
    } else {
      setvisibleEdit(false);
    }
  };

  const fetchData = async()=>{
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    await axios.get("http://127.0.0.1:8000/api/profit",config).then((response)=>{
        setProfitData(response.data.message.data)
        console.log(response.data.message.data)
    }).catch((e)=>{
      console.log(e)}
    )}
  
  useEffect(()=>{
    fetchData()
  },[])

  // Add data

  const handleChangeInputProfit = (e)=>{
    const value = e.target.value;
    setDataProfit({
      ...DataProfit,
      [e.target.name]: value,
    });
  }
  
  const handelSubmitProfit =()=>{
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
      goal_title:DataProfit.goal_title,
      goal_description:DataProfit.goal_description,
      goal_amount:DataProfit.goal_amount,
      currencies_id:DataProfit.currencies_id,
      admins_id:DataProfit.admins_id,
      start_date:DataProfit.start_date,
      end_date:DataProfit.end_date,
    }
    axios.post("http://127.0.0.1:8000/api/profit" , data ,config).then((response)=>{
      console.log(response)
      fetchData()
    }).catch((e)=>{
      console.log(e)
    })
    }


   //delete
    const handelDelete =()=>{
      let token="";
      token=Cookie.get("token");
      let config={
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      axios.delete(`http://127.0.0.1:8000/api/profit/${profitId}` ,config).then((response)=>{
        console.log(response)
        fetchData()
      }).catch((e)=>{
        console.log(e)
      })
    }
    
    //edit data
  
    const handleChangeInpuEdittProfit = (e)=>{

      const value = e.target.value;
      setDataEditProfit({
        ...DataEditProfit,
        [e.target.name]: value,
      });
    }
const handlEditSubmi =()=>{
    let token="";
    token=Cookie.get("token");
    let config={
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const dataEdit = {
      goal_title:DataEditProfit.goal_title,
      goal_description:DataEditProfit.goal_description,
      goal_amount:DataEditProfit.goal_amount,
      currencies_id:DataEditProfit.currencies_id,
      admins_id:DataEditProfit.admins_id,
      start_date:DataEditProfit.start_date,
      end_date:DataEditProfit.end_date,
    }

    axios.patch(`http://127.0.0.1:8000/api/profit/id/${profitId}` , dataEdit ,config).then((response)=>{
      console.log(response)
      fetchData()
    }).catch((e)=>{
      console.log(e)
    })
  }

  if (!profitData) {
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
    <Box>
      <Box
        sx={{
          width: "97%",
          height: "87.5vh",
          overflowY: "scroll",
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
            onClick={isvisibleForIcon}
            sx={{ color: "#3d0066", marginBottom: "15px" }}
          >
            <PostAddIcon
              sx={{
                fontSize: "50px",
                color: "#3d0066",
              }}
            />
          </Button>
          <div className="cardsContainer" style={{ gap: 20 }}>
            {profitData.map((ele) => {
              return (
                <div className="sampleContainer">
                  <Cards
                    title={ele.goal_title}
                    description={ele.goal_description}
                    amount = {ele.goal_amount}
                    curencies={ele.currencies_id}
                    admin = {ele.admins_id}
                    startDate={ele.start_date}
                    endDate={ele.end_date}
                    id={ele.id}
                    edit={isvisibleEdit}
                    getId={getId}
                    handelDelete={handelDelete}
                  />
                </div>
              );
            })}
          </div>
        </Box>

        {visible && (
          <div className="hide-back">
            <Box
              sx={{
                width: "500px",
                backgroundColor: "rgb(255,255,255)",
                borderRadius: "20px",
                position: "fixed",
                top: "14%",
                left: "42%",
                display: "flex",
                justifyContent: "center",
                paddingBottom:'20px'
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginTop: "25px",
                  gap: "20px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h4"> Add Cards</Typography>
                  <Button sx={{ color: "#3d0066" }} onClick={isvisibleForIcon}>
                    <CancelPresentationRoundedIcon sx={{ fontSize: "40px" }} />
                  </Button>
                </Box>
                <TextField id="title" label="Title" variant="filled" name= 'goal_title' onChange={handleChangeInputProfit} />
                <TextField
                  id="description"
                  label="description"
                  variant="filled"
                  name='goal_description'
                  onChange={handleChangeInputProfit}
                />
                <TextField label="Amount" variant="filled"  name='goal_amount' onChange={handleChangeInputProfit}/> 
                <TextField label="Curency id" variant="filled" name='currencies_id' onChange={handleChangeInputProfit}/> 
                <TextField label="Admin id" variant="filled"  name='admins_id' onChange={handleChangeInputProfit}/>
                <label>Start date</label> 
                <TextField  type="date" name='start_date' onChange={handleChangeInputProfit}/>
                <label>End date</label> 
                <TextField type="date" name='end_date' onChange={handleChangeInputProfit}/>
                <Button
                  variant="outlined"
                  sx={{ color: "#3d0066", borderColor: "#3d0066" }}
                  endIcon={<SendIcon />}
                  onClick={() => {
                    setvisible(false);
                    handelSubmitProfit();
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </div>
        )}
        {visibleEdit && (
          <div className="hide-back">
            <Box
              sx={{
                width: "500px",
                backgroundColor: "rgb(255,255,255)",
                borderRadius: "20px",
                position: "fixed",
                top: "14%",
                left: "42%",
                display: "flex",
                justifyContent: "center",
                paddingBottom:"20px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginTop: "25px",
                  gap: "20px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h4"> Edit Cards</Typography>
                  <Button
                    sx={{ color: "#3d0066" }}
                    onClick={() => {
                      setvisibleEdit(false);
                    }}
                  >
                    <CancelPresentationRoundedIcon sx={{ fontSize: "40px" }} />
                  </Button>
                </Box>
                <TextField id="title" label="title" variant="filled" name="goal_title"  onChange={handleChangeInpuEdittProfit}/>
                <TextField
                  id="description"
                  label="description"
                  variant="filled"
                  name="goal_description"
                  onChange={handleChangeInpuEdittProfit}
                />
                <TextField label="Amount" variant="filled"  name="goal_amount" onChange={handleChangeInpuEdittProfit}/> 
                <TextField label="Curency id" variant="filled" name="currencies_id" onChange={handleChangeInpuEdittProfit} /> 
                <TextField label="Admin id" variant="filled" name="admins_id" onChange={handleChangeInpuEdittProfit}/>
                <label>Start date</label> 
                <TextField  type="date" name="start_date" onChange={handleChangeInpuEdittProfit}/>
                <label>End date</label> 
                <TextField type="date" name="end_date" onChange={handleChangeInpuEdittProfit} />
                <Button
                  variant="outlined"
                  sx={{ color: "#3d0066", borderColor: "#3d0066" }}
                  endIcon={<SendIcon />}
                  onClick={() => {
                    setvisible(false);
                    handlEditSubmi()
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
}
export default ProfitGoal;

