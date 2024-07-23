import React, { useState, useEffect} from 'react';
import { fetchTeachers, bookAppointment } from './api';
import { toast } from "react-hot-toast";

const AppointmentBooking = () => {

  const [formData, setFormData] = useState({
    teacher: '',
    date: '',
    time: ''
  });

  const userId =   localStorage.getItem("StdentId");


  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const teacherList = await fetchTeachers();
        setTeachers(teacherList);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    getTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        ...formData,
        student: userId, 
      };
      const response = await bookAppointment(appointmentData);
      toast.success('Appointment booked:', response);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Select Teacher</span>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm"
              required
            >
              <option value="">Select a Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Select Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Select Time</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm"
              required
            />
          </label>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
