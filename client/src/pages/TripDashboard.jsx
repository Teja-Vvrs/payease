import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TripDashboard = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrip(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load trip');
      }
    };
    fetchTrip();
  }, [tripId]);

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFF0]">
        <p className="text-black text-lg">{error || 'Loading...'}</p>
      </div>
    );
  }

  const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = trip.totalBudget - totalExpenses;

  return (
    <div className="min-h-screen bg-[#FFFFF0] py-8">
      <div className="max-w-4xl mx-auto px-4">
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
        <h1 className="text-4xl font-bold text-center text-black mb-8">{trip.name}</h1>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black mb-4">Trip Overview</h2>
            <p className="text-black">Total Budget: ₹{trip.totalBudget.toFixed(2)}</p>
            <p className="text-black">Total Expenses: ₹{totalExpenses.toFixed(2)}</p>
            <p className="text-black">Remaining Balance: ₹{remainingBalance.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-black mb-4">Actions</h2>
            <Link
              to={`/trips/${tripId}/add-expense`}
              className="w-full py-3 bg-gradient-to-r from-[#A0522D] to-[#8B4513] text-white font-semibold rounded-lg hover:from-[#8B4513] hover:to-[#6F3A0F] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 text-center block"
            >
              Add Expense
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.members.map((member) => (
              <div key={member._id} className="p-4 bg-[#FFFFF0] rounded-lg border border-black">
                <p className="text-black font-medium">{member.name}</p>
                <p className="text-black">Wallet Balance: ₹{member.walletBalance.toFixed(2)}</p>
                <p className="text-black">Email: {member.email}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-black mb-4">Recent Expenses</h2>
          {trip.expenses.length === 0 ? (
            <p className="text-black">No expenses yet.</p>
          ) : (
            <div className="space-y-4">
              {trip.expenses.map((expense) => (
                <div key={expense._id} className="p-4 bg-[#FFFFF0] rounded-lg border border-black">
                  <p className="text-black font-medium">{expense.description}</p>
                  <p className="text-black">Amount: ₹{expense.amount.toFixed(2)}</p>
                  <p className="text-black">Paid By: {expense.paidBy.name}</p>
                  <p className="text-black">Shared By: {expense.sharedBy.map((u) => u.name).join(', ')}</p>
                  <p className="text-black">Category: {expense.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;