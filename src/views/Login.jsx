import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReusableInput from '../components/ReusableInput';
import './Login.css'; // Import the CSS file
import ReusableButton from '../components/ReusableButton';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setMessage('');
    try {
      // const response = await fetch('http://localhost:5006/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login successful!');
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <ReusableInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <ReusableInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <ReusableButton onClick={handleLogin}>Login</ReusableButton>  
      {message && <p className="show">{message}</p>}  {/* Added "show" class */}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      
    </div>
  );
};

export default Login;
