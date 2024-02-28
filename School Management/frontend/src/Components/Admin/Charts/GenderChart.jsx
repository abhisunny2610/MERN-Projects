import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GenderChart = ({ femaleCounts, maleCounts, otherCounts }) => {
  const data = {
    labels: ['Female', 'Male', 'Other'],
    datasets: [
      {
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        data: [femaleCounts, maleCounts, otherCounts]
      }
    ]
  };

  const options = {
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        color: '#fff',
        textAlign: 'center',
        formatter: (value) => {
          return value;
        }
      }
    },
    tooltips: {
      enabled: false
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default GenderChart;
