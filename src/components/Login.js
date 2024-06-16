import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the SCSS module
import AxiosHelper from "../helpers/axiosHelper";
const API = new AxiosHelper();

const Login = () => {
  const [question, setQuestion] = useState(null);
  const [question_id, setQuestion_id] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Simulate fetching a question from the backend
  useEffect(() => {
    fetchQuestion();
  }, []);
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setMessage("fetching question...");
      let question = await API.get("/login/question");
      setMessage("Answer the below question to proove you are Karthik");

      setQuestion(question.data.data.question);
      setQuestion_id(question.data.data.id);
      setLoading(false);
    } catch (err) {
      setMessage("Something went wrong, please try after some time");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      let result = await API.post("/login/question", {
        id: question_id,
        answer,
      });
      if(result.data.data){
        //correct answer
        setMessage('Excellent');
        sessionStorage.setItem("username", "karthik");
        navigate("/home");
      }else{
        //wrong anser
        setMessage('wrong answer retry')
      }
      console.log(result.data.data);
    } catch (err) {
      setLoading(false);
      setMessage("Something went wrong, please retry");
      console.log(err);
    }
   
  };

  return (
    <div className="login-container">
      <h3>Welcome to Karthik Pomodoro Application</h3>
      {message && <p>{message}</p>}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Login;
