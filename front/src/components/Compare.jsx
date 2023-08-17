import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import Table from './Table';

const API = "http://127.0.0.1:8000/api/overall_ranking/";
// var API1=
const Compare = () => {
  const [users, setUsers] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(['', '', '']);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chartData, setChartData] = useState(null); // State for storing chart data

  let comparisonChart = null; // Variable to hold the chart instance

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.7)`;
  };
  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers(API);
    const newOptionsArray = users.map((coll) => coll['Name']);
    setOptionsArray(newOptionsArray);
  }, [users]);

  const handleSubmit = () => {
    const newFilteredUsers = users.filter((user) => selectedOptions.includes(user.Name));
    setFilteredUsers(newFilteredUsers);

    // Destroy the previous chart if it exists
    if (comparisonChart) {
      comparisonChart.destroy();
    }

    // Generate chart data
    const chartLabels = ['TLR', 'RPC', 'GO', 'OI', 'PERCEPTION'];
    const datasets = selectedOptions.map((option) => {
      const user = newFilteredUsers.find((user) => user.Name === option);
      return {
        label: option,
        data: [user['TLR(100)'], user['RPC(100)'], user['GO(100)'], user['OI(100)'], user['PERCEPTION(100)']],
        backgroundColor: generateRandomColor(), // Adjust color for each option
      };
    });

    setChartData({ labels: chartLabels, datasets: datasets });
  };

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('comparisonChart').getContext('2d');
      comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.labels,
          datasets: chartData.datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: false, // Set stacked to false to display bars side by side
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <h1>Comparison Page</h1>
      <div style={{ display: 'flex' }}>
        {selectedOptions.map((selectedOption, index) => (
          <select
            key={index}
            value={selectedOption}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ margin: '0 10px' }}
          >
            <option value="">Select an option</option>
            {optionsArray.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <br />
      <br />
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        <canvas id="comparisonChart" width="400" height="200"></canvas>
      </div>
      {filteredUsers.length > 0 && <Table users={filteredUsers} />}
    </div>
  );
};

export default Compare;
