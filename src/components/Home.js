import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  if (!username) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Home;
