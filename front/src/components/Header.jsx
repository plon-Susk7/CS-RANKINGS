import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
         <Link to="/" ><span><h1 className='text-[50px] flex justify-center mb-[30px] pt-[70px]'>CSRankings: Computer Science Rankings</h1></span></Link>
        <Link to="/compare" className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Compare Institutes
        </button>
      </Link>
      <br/>
        <p className='text-[#31708f] bg-[#d9edf7] flex justify-center pr-[30px] pl-[30px] mr-[130px] ml-[130px] pt-[30px] pb-[30px]'>Initial Data is displayed as ranked by NIRF, to view the ranking on the basis of specific paramters, mark the checkboxes for the parameter that you would like. The rankings shall be adjusted according to the sum of the paramters that are marked. This list currently comprises of the top 100 institutes. Rankings shall be broadened along with further data collection. </p>
        
    </div>
  )
}

export default Header