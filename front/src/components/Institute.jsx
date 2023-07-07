import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Institute = () => {
  const { instituteId } = useParams();
  const API1 = `http://127.0.0.1:8000/api/institute/${instituteId}/UG/placement/`;
  const API2 = `http://127.0.0.1:8000/api/institute/${instituteId}/PG/placement/`;
  const API3 = `http://127.0.0.1:8000/api/institute/${instituteId}/UG/students/`;
  const API4 = `http://127.0.0.1:8000/api/institute/${instituteId}/PG/students/`;
  const API5 = `http://127.0.0.1:8000/api/institute/${instituteId}/PHD/students/`;

  const [placementUG, setPlacementUG] = useState([]);
  const [placementPG, setPlacementPG] = useState([]);
  const [studentsUG, setStudentsUG] = useState([]);
  const [studentsPG, setStudentsPG] = useState([]);
  const [studentsPhD, setStudentsPhD] = useState([]);

  useEffect(() => {
    fetch(API1)
      .then((response) => response.json())
      .then((data) => setPlacementUG(data))
      .catch((error) => console.log(error));

    fetch(API2)
      .then((response) => response.json())
      .then((data) => setPlacementPG(data))
      .catch((error) => console.log(error));

    fetch(API3)
      .then((response) => response.json())
      .then((data) => setStudentsUG(data))
      .catch((error) => console.log(error));

    fetch(API4)
      .then((response) => response.json())
      .then((data) => setStudentsPG(data))
      .catch((error) => console.log(error));

    fetch(API5)
      .then((response) => response.json())
      .then((data) => setStudentsPhD(data))
      .catch((error) => console.log(error));
  }, [API1, API2, API3, API4, API5]);

  return (
    <div>
      <h1>Institute Details</h1>
      <p>Institute ID: {instituteId}</p>
      {/* Add additional content or functionality as needed */}
      <h2>Placement UG:</h2>
      <table>
        <thead>
          <tr>
            <th>Acadenic Year</th>
            <th>First Yr Students Intake</th>
            <th>First Yr Students admitted</th>
            <th>Academic Year.1</th>
            <th>Lateral entry admission</th>
            <th>Academic Year.2</th>
            <th>Students graduating in min time</th>
            <th>Students placed</th>
            <th>Median Salary</th>
            <th>Students selected for higher study</th>
          </tr>
        </thead>
        <tbody>
        {placementUG.map((item, index) => (
              <tr key={index}>
                <td>{item['Academic Year']}</td>
                <td>{item['No. of first year\rstudents intake in the\ryear']}</td>
                <td>{item['No. of first year\rstudents admitted in\rthe year']}</td>
                <td>{item['Academic Year.1']}</td>
                <td>{item['No. of students\radmitted through\rLateral entry']}</td>
                <td>{item['Academic Year.2']}</td>
                <td>{item['No. of students\rgraduating in\rminimum stipulated\rtime']}</td>
                <td>{item['No. of students\rplaced']}</td>
                <td>{item['Median salary of\rplaced graduates per\rannum(Amount in\rRs.)']}</td>
                <td>{item['No. of students\rselected for Higher\rStudies']}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Placement PG:</h2>
      <table>
        <thead>
          <tr>
            <th>Academic Year</th>
            <th>First Yr Students Intake</th>
            <th>First Yr Students admitted</th>
            <th>Academic Year.1</th>
            <th>Lateral entry admission</th>
            <th>Academic Year.2</th>
            <th>Students graduating in min time</th>
            <th>Students placed</th>
            <th>Median Salary</th>
            <th>Students selected for higher study</th>
          </tr>
        </thead>
        <tbody>
        {placementPG.map((item, index) => (
              <tr key={index}>
                <td>{item['Academic Year']}</td>
                <td>{item['No. of first year\rstudents intake in the\ryear']}</td>
                <td>{item['No. of first year\rstudents admitted in\rthe year']}</td>
                <td>{item['Academic Year.1']}</td>
                <td>{item['No. of students\radmitted through\rLateral entry']}</td>
                <td>{item['Academic Year.2']}</td>
                <td>{item['No. of students\rgraduating in\rminimum stipulated\rtime']}</td>
                <td>{item['No. of students\rplaced']}</td>
                <td>{item['Median salary of\rplaced graduates per\rannum(Amount in\rRs.)']}</td>
                <td>{item['No. of students\rselected for Higher\rStudies']}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <h2>Students UG:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {studentsUG.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Students PG:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {studentsPG.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Students PhD:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {studentsPhD.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Institute;
