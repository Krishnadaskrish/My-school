import { Axios } from "../../Instance/AxiosInstance";
import axios from "axios";

export const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/student/getTeachers');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  };


  export const bookAppointment = async (appointmentData) => {
    try {
      const response = await Axios.post('/api/student/book-appointment', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  };