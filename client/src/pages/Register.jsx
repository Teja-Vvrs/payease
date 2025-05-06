
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration successful! Please login.');
      onRegisterSuccess(); // switch to login
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFF0]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-500">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-[#A0522D] to-[#8B4513] rounded-full animate-pulse opacity-50"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[#A0522D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a4 4 0 00-4 4c0 2.21 1.79 4 4 4s4-1.79 4-4a4 4 0 00-4-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10v6a4 4 0 008 0v-6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h3m8 0h3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16l2 4 2-4" />
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-black mb-8">Join TripEase</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#A0522D] to-[#8B4513] text-white font-semibold rounded-lg hover:from-[#8B4513] hover:to-[#6F3A0F] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-[#8B4513] hover:text-[#6F3A0F] font-medium transition-colors duration-300"
          >
            Have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;