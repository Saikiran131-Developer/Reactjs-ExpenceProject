import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import TransactionView from './views/TransactionView';
import Register from './views/Register';
import Login from './views/Login';
import UserProfile from './views/UserProfile';
import BudgetGoalView from './views/BudgetGoalView';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <h1>Expense Tracker</h1>
        {user ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <nav>
              <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/budget-goals">Budget Goals</Link>
            </nav>
            <Routes>
              <Route path="/" element={<TransactionView />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/budget-goals" element={<BudgetGoalView />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/register" element={<Register onRegisterSuccess={() => window.location.href = '/login'} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
