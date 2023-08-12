import React, { useState, useEffect } from 'react';
import Table from './Table';

const API = "http://127.0.0.1:8000/api/overall_ranking/";

const Compare = () => {
  const [users, setUsers] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(['', '', '']);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
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
    console.log("Selected Options1:", selectedOptions[0]);
    console.log("Selected Options2:", selectedOptions[1]);
    console.log("Selected Options3:", selectedOptions[2]);
    const newFilteredUsers = users.filter((user) => selectedOptions.includes(user.Name));
    console.log("Filtered Users:", newFilteredUsers);
    setFilteredUsers(newFilteredUsers);

  };

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

      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        </div>
      {/* <button >Submit</button> */}
      {filteredUsers.length > 0 && <Table users={filteredUsers} />}
    </div>
  );
};

export default Compare;
