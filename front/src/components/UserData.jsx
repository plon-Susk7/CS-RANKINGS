import React from 'react';

const UserData = (props) => {
  const sortedUsers = props.users.sort((a, b) => b.sum - a.sum);

  return (
    <>
      {sortedUsers.map((curUser,index) => {
        const {
          Rank,
          Name,
          'TLR(100)': TLR,
          'RPC(100)': RPC,
          'GO(100)': GO,
          'OI(100)': OI,
          'PERCEPTION(100)': PERCEPTION,
          'Institute ID': id,
          sum
        } = curUser;

        return (
          <tr key={id}>
            <td>{index+1}</td>
            <td>{Name}</td>
            <td>{TLR}</td>
            <td>{RPC}</td>
            <td>{GO}</td>
            <td>{OI}</td>
            <td>{PERCEPTION}</td>
            <td>{sum}</td>
          </tr>
        );
      })}
    </>
  );
};

export default UserData;
