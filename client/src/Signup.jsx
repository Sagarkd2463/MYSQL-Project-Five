import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validationSignup from './SignupValidation';

import axios from 'axios';

function Signup() {

    const [values, setValues] = useState({
        name:'',
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
        setError(validationSignup(values));
        if(error.name === "" && error.email === "" && error.password === ""){
            axios.post('http://localhost:3001/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    };


    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" name='name' placeholder='Enter Name' className='form-control rounded-0' onChange={handleInput}/>
                        {error.name && <span className='text-danger'>{error.name}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name='email' placeholder='Enter Email' className='form-control rounded-0' onChange={handleInput}/>
                        {error.email && <span className='text-danger'>{error.email}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name='password' placeholder='Enter Password' className='form-control rounded-0' onChange={handleInput}/>
                        {error.password && <span className='text-danger'>{error.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
                    <p>You are agreeing to our terms and conditions.</p>
                    <Link to={'/'} className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;