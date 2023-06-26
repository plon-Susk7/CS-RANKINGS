import React from 'react'

const Header = () => {
  return (
    <div>
        <h1 className='text-[50px] flex justify-center mb-[30px]'>CSRankings: Computer Science Rankings</h1>
        <p className='text-[#31708f] bg-[#d9edf7] flex justify-center mr-[160px] ml-[160px]'>Initial Data is displayed as ranked by NIRF, to view the ranking on the basis of specific paramters, mark the checkboxes for the parameter that you would like. The rankings shall be adjusted according to the sum of the paramters that are marked. This list currently comprises of the top 100 institutes. Rankings shall be broadened along with further data collection. </p>
    </div>
  )
}

export default Header