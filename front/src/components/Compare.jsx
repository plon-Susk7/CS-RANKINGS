import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import Table from './Table';

const API = "http://127.0.0.1:8000/api/overall_ranking/";
const API_BASE = "http://127.0.0.1:8000/api/";
// var API1=
const Compare = () => {
  const [users, setUsers] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(['', '', '']);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedInstituteIds, setSelectedInstituteIds] = useState([]);
  const [endps, setEndps] = useState([]);
  const [chartData, setChartData] = useState(null); // State for storing chart data
  const [dataArray1, setDataArray1] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const [dataArray3, setDataArray3] = useState([]);

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
  const transformData = async(data) => {
    return data.map(item => {
      const medianSalaryStr = item['Median salary of\rplaced graduates per\rannum(Amount in\rRs.)'];
      const numericValue = parseInt(medianSalaryStr.split('(')[0].trim());
      return {
        'Academic Year': item['Academic Year'],
        'Median salary of placed graduates per annum(Amount in Rs.)': numericValue,
        'No. of students selected for Higher Studies': item['No. of students\rselected for Higher\rStudies']
      };
    });
  };

  const fetchData = async () => {
    try {
      const dataArrays = await Promise.all(endps.map(async (endpoint) => {
        try {
          const res = await fetch(endpoint);
          const data = await res.json();
          return transformData(data);
        } catch (error) {
          console.error(error);
          return [];
        }
      }));

      setDataArray1(dataArrays[0]);
      setDataArray2(dataArrays[1]);
      setDataArray3(dataArrays[2]);
      generateChart(dataArrays);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endps]);
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
    if (dataArray1 && dataArray2 && dataArray3) {
      console.log(dataArray1);
      console.log(dataArray2);
      console.log(dataArray3);
    }
  }, [dataArray1, dataArray2, dataArray3]);
  useEffect(() => {
    const instituteEndpoints = selectedInstituteIds.map(instituteId => `${API_BASE}institute/${instituteId}/UG/placement/`);
    setEndps(instituteEndpoints)
  }, [selectedInstituteIds]);
  // useEffect(() => {
  //   console.log("IDs:", selectedInstituteIds);
  // }, [selectedInstituteIds]);
  useEffect(() => {
    fetchUsers(API);
    const newOptionsArray = users.map((coll) => coll['Name']);
    setOptionsArray(newOptionsArray);
  }, [users]);
  const generateChart = (dataArrays) => {
    
    const labels = dataArrays[0].map(item => item['Academic Year']); // Assuming the academic year is the same for all dataArrays
    const datasets = dataArrays.map((dataArray, index) => ({
      label: `Dataset ${index + 1}`,
      data: dataArray.map(item => item['Median salary of placed graduates per annum(Amount in Rs.)']),
      backgroundColor: generateRandomColor(), // Generate a random color for each dataset
    }));
  
    const ctx = document.getElementById('comparisonChart2').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Median Salary (Rs.)', // Y-axis label
            },
          },
        },
      },
    });
  };
  const handleSubmit = () => {
    const newFilteredUsers = users.filter((user) => selectedOptions.includes(user.Name));
    setFilteredUsers(newFilteredUsers);
    // console.log(filteredUsers)
    const newSelectedInstituteIds = newFilteredUsers.map((user) => user["Institute ID"]);
    setSelectedInstituteIds(newSelectedInstituteIds);
    // console.log(selectedInstituteIds)
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
    // const dataArrays = [dataArray1, dataArray2, dataArray3];
    // generateChart(dataArrays);
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
      <div className="flex justify-center">
          <canvas id="comparisonChart2" width="600" height="400"></canvas>
      </div>
    </div>
  );
};

export default Compare;
