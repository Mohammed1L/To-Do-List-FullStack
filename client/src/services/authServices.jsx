import axios from 'axios';


const SERVER_URL = 'http://localhost:5000/api';


const registerUser = (data)=>{
    return axios.post(SERVER_URL+'/register',data);
}

const loginUser = (data) => {
    console.log(`${SERVER_URL}/login`);
    return axios.post(`${SERVER_URL}/login`, data);
  };


const AuthService = { 
    registerUser,
    loginUser
}

export default AuthService;