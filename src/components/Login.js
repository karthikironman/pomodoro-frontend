import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // Import the SCSS module

const Login = () => {
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  // Simulate fetching a question from the backend
  useEffect(() => {
    setTimeout(() => {
      setQuestion('What is your favorite color?');
    }, 1000);
  }, []);

  const handleLogin = () => {
    if (answer.toLowerCase() === 'blue') { // Simulating answer validation
      sessionStorage.setItem('username', 'karthik');
      navigate('/home');
    } else {
      alert('Incorrect answer. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Karthik Pomodoro Application</h1>
      <h2>Prove you are Karthik</h2>
      {question && (
        <div>
          <p>{question}</p>
          <input
            type="text"
            placeholder="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleLogin}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Login;
