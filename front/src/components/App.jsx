import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './Table';
import Header from './Header';
import Institute from './Institute';
import Compare from './Compare';

const API = "http://127.0.0.1:8000/api/overall_ranking/";


const App = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.length > 0) {
            setUsers(data);
        }
        // console.log(data);
    } catch (e) {
        console.error(e)
    }
}


useEffect(() => {
    fetchUsers(API);
}, [])
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={''}>
          <Routes>
            <Route path={'/'} element={<Table users={users}/>} />
            <Route path={'/compare'} element={<Compare />} />
            <Route path="/institute/:instituteId" element={<Institute />} />
          </Routes>
        </div>
      </BrowserRouter>


    </div>
  )
}

export default App