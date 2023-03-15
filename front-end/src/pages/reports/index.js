import React from "react";
import {
  Chart,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { argument: "Jan", value: 100 },
  { argument: "Feb", value: 200 },
  { argument: "Mar", value: 300 },
  { argument: "Apr", value: 400 },
  { argument: "May", value: 500 },
  { argument: "Jun", value: 600 },
  { argument: "Jul", value: 700 },
  { argument: "Aug", value: 800 },
  { argument: "Sep", value: 900 },
  { argument: "Oct", value: 1000 },
  { argument: "Nov", value: 1100 },
  { argument: "Dec", value: 1200 },
];

function ReportChart() {
  return (
    <Chart data={data} sx={{ animation: "fade 0.5s ease-in" }}>
      <ArgumentAxis />
      <ValueAxis />
      <LineSeries valueField="value" argumentField="argument" color="#3d0066" />
      <Animation />
    </Chart>
  );
}

export default ReportChart;
