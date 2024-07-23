import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import RegisterModal from '../../componets/RegisterModel/Register';
import LoginModal from '../../componets/LoginModel/Login';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array to run only on mount

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLogin = () => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a  className="text-white text-2xl font-bold">My School</a>

          {/* Menu Icon for Mobile */}
          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Navbar Links */}
          <div className={`lg:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium" onClick={() => navigate('/profile')}>Profile</a>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
};

export default Navbar;
