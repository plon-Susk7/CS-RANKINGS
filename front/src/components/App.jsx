import React from 'react'
import Table from './Table'
import Header from './Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className={''}>
          <Routes>
            <Route path={'/'} element={<Table />} />
            {/* <Route path={'/rules'} element={< />} /> */}
          </Routes>
        </div>
      </BrowserRouter>


    </div>
  )
}

export default App