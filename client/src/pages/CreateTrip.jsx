import React, { useState } from 'react';
import axios from 'axios';

const CreateTrip = ({ onTripCreated }) => {
  const [formData, setFormData] = useState({ name: '', totalBudget: '', members: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const memberEmails = formData.members
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email);
      const response = await axios.post(
        'http://localhost:5000/api/trips',
        {
          name: formData.name,
          totalBudget: parseFloat(formData.totalBudget),
          members: memberEmails,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ name: '', totalBudget: '', members: '' });
      setError('');
      onTripCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip');
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
        <h2 className="text-3xl font-bold text-center text-black mb-8">Create a New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Trip Name</label>
            <input
              type="text"
              placeholder="E.g., Goa Adventure"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Total Budget (₹)</label>
            <input
              type="number"
              placeholder="E.g., 10000"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.totalBudget}
              onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
              required
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Invite Members (Emails, comma-separated)</label>
            <textarea
              placeholder="E.g., friend1@example.com, friend2@example.com"
              className="mt-1 w-full px-4 py-3 bg-[#FFFFF0] border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all duration-300"
              value={formData.members}
              onChange={(e) => setFormData({ ...formData, members: e.target.value })}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#A0522D] to-[#8B4513] text-white font-semibold rounded-lg hover:from-[#8B4513] hover:to-[#6F3A0F] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
          >
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;