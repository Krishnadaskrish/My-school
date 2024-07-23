import React, { useState, useEffect } from 'react';
import { fetchTeacherAppointments, approveAppointment } from './api';
import { toast } from "react-hot-toast";

const TeacherAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const TeacherId =   localStorage.getItem("TeacherId");

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointments = await fetchTeacherAppointments(TeacherId);
        setAppointments(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (localStorage.getItem("role") === 'Teacher') {
      getAppointments();
    }
  }, [TeacherId]);

  const handleApprove = async (appointmentId) => {
    try {
      await approveAppointment(appointmentId);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, approved: true } : appointment
        )
      );
    } catch (error) {
        toast.error('Error approving appointment:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Pending Appointments</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment?._id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <p>
                <strong>Student:</strong> {appointment?.student?.name}
              </p>
              <p>
                <strong>Date:</strong> {new Date(appointment?.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appointment?.time}
              </p>
              <p>
                <strong>Status:</strong> {appointment?.approved ? 'Approved' : 'Pending'}
              </p>
              {!appointment?.approved && (
                <button
                  onClick={() => handleApprove(appointment?._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherAppointments;
