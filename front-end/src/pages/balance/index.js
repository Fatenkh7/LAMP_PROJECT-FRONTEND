import React, { useState } from 'react';
import ApexChart from 'react-apexcharts';
import './balance.css';

export function Balance() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: ['#8e44ad']
  });
  const [chartSeries, setChartSeries] = useState([
    {
      name: 'balance',
      data: [1000, 2000, 1500, 3000, 2000, 2500, 1800, 2200, 2800, 1900, 2300, 2700]
    }
  ]);
  const [isPolar, setIsPolar] = useState(false);

  const handleSwitchChart = () => {
    setIsPolar(!isPolar);
  };

  return (
    <div>
      <button onClick={handleSwitchChart}>Switch Chart</button>
      {!isPolar ? (
        <ApexChart options={chartOptions} series={chartSeries} type="bar" height={350} width={1550} />
      ) : (
        <BalanceYearly />
      )}
    </div>
  );
}

export function BalanceYearly() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'polarArea'
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  });
  const [chartSeries, setChartSeries] = useState([
    1000, 2000, 1500, 3000, 2000, 2500, 1800, 2200, 2800, 1900, 2300, 2700
  ]);

  return (
    <div>
      <ApexChart options={chartOptions} series={chartSeries} type="polarArea" height={550} />
    </div>
  );
}
