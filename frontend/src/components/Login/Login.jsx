import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const Login = ({ setShowLogin }) => {
    const [curState, setCurState] = useState('Sign Up')
    const { baseURL, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    //access api to login and registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        let takeURL = baseURL;
        if (curState == 'Login') {
            takeURL += '/api/user/login';
        } else {
            takeURL += '/api/user/register';
        }

        const callAPI = await axios.post(takeURL, data);
        if (callAPI.data.success) {
            setToken(callAPI.data.token);
            localStorage.setItem('token', callAPI.data.token)
            setShowLogin(false);
        } else {
            alert(callAPI.data.message);
        }
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])
    

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-container">
                <div className="login-title">
                    <h2>{curState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-inputs">
                    {curState === 'Login' ? <></> : <input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='Your name' required />}
                    <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Your eamil' required />
                    <input onChange={onChangeHandler} value={data.password} name='password' type="password" placeholder='Your Password' required />
                </div>

                <button type='submit'>{curState === 'Sign Up' ? 'Create account' : 'Login'}</button>

                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & private policy</p>
                </div>

                {curState === 'Login' ? <p>Create a new account?<span onClick={() => setCurState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurState('Login')}>Login here</span></p>
                }
            </form>
        </div>


    )
}

export default Login