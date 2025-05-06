import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateTrip from './pages/CreateTrip'
import TripDashboard from './pages/TripDashboard'

const App = () => {
  return (
    <div> 
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateTrip />} /> 
          <Route path="/dashboard" element={<TripDashboard />} />
        </Routes>
      </Router>   
        

    </div>
  )
}

export default App