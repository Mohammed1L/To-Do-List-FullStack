import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from "./../../../images/homepage.jpg"
import Navbar from '../../../components/Navbar'
import 'antd'
import 'antd/dist/reset.css'; // For Ant Design v5+
import { ToastContainer, toast  } from 'react-toastify';
import { message, Button } from "antd";
import AuthService from '../../../services/authServices';
import { data, useNavigate } from 'react-router';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit =async ()=>{
    console.log('log in')
    try{
      let data = {
        username,
        password
      }
      const response = await AuthService.loginUser(data);
      console.log(response.data)
      localStorage.setItem('toDoAppUser',JSON.stringify(response.data)) // response from the server to get jwt token 
      message.success("Welcome")
      navigate('/to-do')
     
    }catch(err){
      console.log(err)
      message.error("Wrong email or password")
    }
  }

  return (
    <div className={styles.container}>
       <Navbar active ={'home'}/>
      {/* Left section with login card */}
      <div className={styles.login_card}>
        <h4 className={styles.title}>Log in</h4>
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.login_button} onClick={handleSubmit}>Login</button>
      </div>
      

      {/* Right section with the image */}
      <div className={styles.image_section}></div>
    </div>
  );
}

export default Login;



