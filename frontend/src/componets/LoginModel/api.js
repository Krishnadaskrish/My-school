import axios from 'axios';

const API_URL =  process.env.REACT_APP_BASE_URL;

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, formData);
    console.log(response.data.role)
    return response.data;
    
  } catch (error) {
    throw error;
  }
};