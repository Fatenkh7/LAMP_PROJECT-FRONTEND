import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { height } from '@mui/system';

export default function StateTextFields() {


  return (
    <Box style={{marginLeft:'15%', marginTop:'15%' , height:150, width: '40%',} }
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Add Currency"
     
      />
      <TextField
        id="outlined-uncontrolled"
        label="Add Rate"
      />
       <Button variant="contained" disableElevation style={{height: 55}}>
      Submit
    </Button>
    </Box>
  );
}