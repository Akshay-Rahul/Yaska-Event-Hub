import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Component/Homepage/Home';
import { AuthProvider } from './Component/Homepage/AuthContext';
import UserLogin from './Component/Homepage/Login/UserLogin';
import UserRegister from './Component/Homepage/Login/UserRegister';
import AdminLogin from './Component/Homepage/Login/AdminLogin';
import AdminRegister from './Component/Homepage/Login/AdminRegister';
import TeamMembers from './Component/Homepage/Login/TeamMembers';
import AdminDashboard from './Component/Dashboard/Admin/AdminDashboard';
import UserDashboard from './Component/Dashboard/User/UserDashboard';
import Tickets from './Component/Dashboard/User/Payment';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/Team" element={<TeamMembers />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/tickets" element={<Tickets/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
