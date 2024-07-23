import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';
import { toast } from "react-hot-toast";


const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      toast.success('User logged in successfully:', response);

      if (( response.role) === 'Teacher') {
        localStorage.setItem("role", "Teacher")
        localStorage.setItem("token", response.data);
        localStorage.setItem("TeacherId", response.id);
        navigate('/teacher');
      } else if (response.role === 'Student') {
        localStorage.setItem("token", response.data);
        localStorage.setItem("StdentId", response.id);
        navigate('/');
      }

      onClose();
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email ID
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </label>
          <label className="block mb-4">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
