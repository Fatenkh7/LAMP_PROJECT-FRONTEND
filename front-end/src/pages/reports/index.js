import React from "react";
import Grid from "@mui/material/Grid";
import { Drawer, Typography } from "@mui/material"
import { Box, color, width } from "@mui/system";
import Paper from '@mui/material/Paper';
import "../reports/reports.css"
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { argument: '2000', value: 1200 },
  { argument: '2005', value: 2000 },
  { argument: '2010', value: 1700 },
  { argument: '2015', value: 2500 },
  { argument: '2020', value: 1200 },
  { argument: '2023', value: 10000 },
];


function ProfitGoal() {
  return (
    <Box>
      
    </Box>
    
  );
}

export default ProfitGoal;
