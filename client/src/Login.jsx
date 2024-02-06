import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';

import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(values));
    if (error.name === "" && error.email === "" && error.password === "") {
      axios.post('http://localhost:3001/login', values)
        .then(res => {
          if(res.data === "success"){
            navigate('/home');
          } else {
            alert('No data found...');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-center'>Log In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" name='email' placeholder='Enter Email' className='form-control rounded-0' onChange={handleInput} />
            {error.email && <span className='text-danger'>{error.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" name='password' placeholder='Enter Password' className='form-control rounded-0' onChange={handleInput} />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
          <p>You are agreeing to our terms and conditions.</p>
          <Link to={'/signup'} className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;