import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');

    useEffect(() => {
        if(!username){
            navigate('/');
        }
    },[username, navigate])
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
