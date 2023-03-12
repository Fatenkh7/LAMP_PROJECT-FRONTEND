import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';

function ProfitCards (props) {
    const [isvisible, setisvisible] = useState(false);
    const [showORhide, setstatus] = useState(<RemoveRedEyeTwoToneIcon/>);
    


    const isVisible = ()=>{
        if(isvisible=== false || showORhide === <RemoveRedEyeTwoToneIcon/>){
            setisvisible(true)
            setstatus(<VisibilityOffTwoToneIcon/>)
        }else{
            setisvisible(false)
            setstatus(<RemoveRedEyeTwoToneIcon/>)
        }
    }


    return (
        
        <Box sx={{width:"300px" ,backgroundColor :'blueviolet' , borderRadius:"10px"  ,margin: '10px 10px 10px 10px' , boxShadow :'2px 2px 3px #888888' }} >
            <div style={{height:'100%'  , position:"relative"}}>
            <Box sx={{padding : '10px 10px 10px 10px'}} >
                <Box sx={{display:'flex'  , height :'50px' , backgroundColor:'white' , borderRadius:'10px' , position : 'absolute', top:'-25px' , boxShadow:'2px 2px 2px #888888' }}>
                    <Button  sx={{color : '#c5b3d1', borderColor:'#c5b3d1' }}  onClick={isVisible}>{showORhide}</Button>
                    <Button onClick={props.edit} sx={{color:"#c5b3d1"}}><EditIcon sx={{color:"#c5b3d1"}}/></Button>
                    <Button sx={{color:"#c5b3d1"}}><DeleteIcon sx={{color:"#c5b3d1"}}/></Button>
                </Box>
                <h3 style={{marginTop:30}}>title : {props.title}</h3>
                {isvisible && <p>{props.description}</p>}
            </Box>
            </div>
        </Box>
    );
}

export default ProfitCards ;