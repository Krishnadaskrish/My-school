// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL) 

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
