import { Axios } from "../../Instance/AxiosInstance";


export const fetchTeacherAppointments = async (teacherId) => {
    const response = await Axios.get(`/api/teacher/${teacherId}/appointments`);
    return response.data.data;
  };


  export const approveAppointment = async (appointmentId) => {
    const response = await Axios.post('/api/teacher/approve-appointment', { appointmentId });
    return response.data.data;
  };