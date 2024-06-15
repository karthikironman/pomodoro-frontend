import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem('username', username);
    navigate('/home');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input 
        type="text" 
        placeholder="Enter your username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
