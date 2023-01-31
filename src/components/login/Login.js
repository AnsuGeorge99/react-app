import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '../cards/Card';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const UsernameHandler = (event) => {
        setUsername(event.target.value);
    };
    const PasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
      }, [isLoggedIn, navigate]);

    const SubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/Customers/adminLogin', {
                username,
                password,
            });
            if (response.data === true) {
                setIsLoggedIn(true);
            }
            else {
                setError("*Invalid username or password");
            }
        } catch (error) {
            console.error(error);
        }
        setUsername('');
        setPassword('');
    };

    return (
        <Card>
            <form onSubmit={SubmitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input className='label' type="text" value={username} name="username" id='username' placeholder='Enter your email here' onChange={UsernameHandler} />

                    <label htmlFor="password">Password</label>
                    <input className='label' type="password" value={password} name="password" id='password' placeholder='Enter your password here' onChange={PasswordHandler} />

                    <input className='button' type="submit" value="Login" />
                    {error && <p className='error'>{error}</p>}
                </div>
            </form>
        </Card>
    )
}

export default Login;