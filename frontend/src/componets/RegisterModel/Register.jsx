import React, { useState } from 'react';
import { registerUser } from './api';
import { toast } from "react-hot-toast";


const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    institute: '',
    password : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success('User registered successfully:', response);
      onClose();
    } catch (error) {
      toast.error('Error registering user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </label>
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
          <label className="block mb-2">
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </label>
          <div className="mb-4">
            <p className="mb-2">Role</p>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="Teacher"
                checked={formData.role === 'Teacher'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Teacher</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="role"
                value="Student"
                checked={formData.role === 'Student'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Student</span>
            </label>
            <label className="block mt-4">
              <select
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Institute</option>
                <option value="Institute1">Institute 1</option>
                <option value="Institute2">Institute 2</option>
                <option value="Institute3">Institute 3</option>
              </select>
            </label>
            <label className="block mb-2">
            password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              required
            />
          </label>
            
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
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

export default RegisterModal;
