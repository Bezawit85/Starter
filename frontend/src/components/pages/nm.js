import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="page-container" style={{backgroundColor:"#dcdcf5"}}>
      <h1>Login</h1>
      <div className="container mx-auto w-8/12">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

const InternList = (props) => {
  const [interns, setInterns] = useState([]);
const columns = [
  {
  name: 'FirstName',
  selector : row => row.firstName
  },
  {
    name: 'LastName',
    selector : row => row.lastName
  },
  {
    name: 'Email',
    selector : row => row.email
  },
  {
    name: 'Department',
    selector : row => row.department
  },
  {
    name: 'Gpa',
    selector : row => row.gpa
  },
  {
    name: 'Batch',
    selector : row => row.batch
  },
  {
    name: 'Date',
    selector : row => row.date
  }
];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/interns", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setInterns(result.data);
    };
    fetchData();
  }, []);
  
  return (
 
    <div>
      
      <h1>Intern List</h1>
      <DataTable
        columns = {columns}
        data ={interns}
        selectableRows
        pagination
         >
    
        <tbody>
          {interns.map((intern) => (
            <tr key={intern._id}>
              <td>{intern.firstName} </td>
              <td>{intern.lastName}</td>
              <td>{intern.email}</td>
              <td>{intern.department}</td>
              <td>{intern.gpa}</td>
              <td>{intern.batch}</td>
              <td>{intern.date}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default InternList;
