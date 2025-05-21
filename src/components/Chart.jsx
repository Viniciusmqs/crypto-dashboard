import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Chart({ labels, prices }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Preço (USD)',
        data: prices,
        fill: false,
        borderColor: '#0d6efd',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default Chart;
