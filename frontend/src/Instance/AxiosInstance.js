import axios from 'axios'; 

export const Axios = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type":"application/json",
      Authorization:  `Bearer ${localStorage.getItem("token")}`,
    }
  
  })