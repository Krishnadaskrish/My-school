// Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../Instance/AxiosInstance';
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institute: ''
  });
  const userId =   localStorage.getItem("StdentId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get(`/api/student/profile/${userId}`);
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          institute: response.data.institute
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async () => {
    try {
      const response = await Axios.put(`/api/student/profile/${userId}`, formData);
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(`/api/student/profile/${userId}`);
      // Navigate to another page or show a success message
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">User Profile</h2>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Name: {profile.name}</p>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Email: {profile.email}</p>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Phone: {profile.phone}</p>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Institute: {profile.institute}</p>
          <input type="text" name="institute" value={formData.institute} onChange={handleChange} className="block w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700" />
        </div>
        <button
          onClick={handleEdit}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg mb-4"
        >
          Edit Profile
        </button>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition duration-300 shadow-lg"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
