import React from 'react';
import UserData from './UserData';

const Filter = (props) => {
  const updatedUsers = props.users.map((curUser) => {
    let {
      Rank,
      Name,
      'TLR(100)': TLR,
      'RPC(100)': RPC,
      'GO(100)': GO,
      'OI(100)': OI,
      'PERCEPTION(100)': PERCEPTION,
      'Institute ID': id
    } = curUser;

    if (!props.ch1) {
      TLR = 0;
    }
    if (!props.ch2) {
      RPC = 0;
    }
    if (!props.ch3) {
      GO = 0;
    }
    if (!props.ch4) {
      OI = 0;
    }
    if (!props.ch5) {
      PERCEPTION = 0;
    }
//


//
  return (
    <>
      <UserData users={updatedUsers} ch1={props.ch1} ch2={props.ch2} ch3={props.ch3} ch4={props.ch4} ch5={props.ch5} />
    </>
  );
};

export default Filter;
