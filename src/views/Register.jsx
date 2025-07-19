import React, { useState } from 'react';
import ReusableInput from '../components/ReusableInput';
import ReusableButton from '../components/ReusableButton';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    setMessage('');
    try {
      const response = await fetch('http://localhost:5006/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Please login.');
        setUsername('');
        setEmail('');
        setPassword('');
        if (onRegisterSuccess) onRegisterSuccess();
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <ReusableInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <ReusableButton onClick={handleRegister}>Register</ReusableButton>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
