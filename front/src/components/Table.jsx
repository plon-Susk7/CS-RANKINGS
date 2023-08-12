import {useEffect, useState} from "react";
import UserData from "./UserData.jsx";
import Checkbox from "./Checkbox.jsx";
import Filter from "./Filter.jsx";
const API = "http://127.0.0.1:8000/api/overall_ranking/";

const Table = (props) => {
    // const [users, setUsers] = useState([]);//
    // const [loading,setLoading]=useState(true);
    // const [records,setRecords]=useState([]); 
    const [checked, setChecked] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);
    const [checked4, setChecked4] = useState(true);
    const [checked5, setChecked5] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleChange2 = () => {
    setChecked2(!checked2);
  };
  const handleChange3 = () => {
    setChecked3(!checked3);
  };
  const handleChange4 = () => {
    setChecked4(!checked4);
  };
  const handleChange5 = () => {
    setChecked5(!checked5);
  };
  // const fetchUsers = async (url) => {
  //       try {
  //           const res = await fetch(url);
  //           const data = await res.json();
  //           if (data.length > 0) {
  //               setUsers(data);
  //           }
  //           // console.log(data);
  //       } catch (e) {
  //           console.error(e)
  //       }
  //   }


  //   useEffect(() => {
  //       fetchUsers(API);
  //   }, [])
    return <>
        <table>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>TLR       <Checkbox
                  label=""
                  value={checked}
                  onChange={handleChange}
              /></th>
                <th>RPC        <Checkbox
                  label=""
                  value={checked2}
                  onChange={handleChange2}
              /></th>
                <th>GO         <Checkbox
                  label=""
                  value={checked3}
                  onChange={handleChange3}
              /></th>
                <th>OI          <Checkbox
                  label=""
                  value={checked4}
                  onChange={handleChange4}
              /></th>
                <th>PERCEPTION       <Checkbox
                  label=""
                  value={checked5}
                  onChange={handleChange5}
              /></th>
                <th>
                  FIN_SCORE
                </th>
            </tr>
            </thead>
            <tbody>
            <Filter users={props.users} ch1={checked} ch2={checked2} ch3={checked3} ch4={checked4} ch5={checked5} />
            </tbody>
        </table>
    </>
}

export default Table;