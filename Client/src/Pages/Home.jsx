// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognitionComponent from '../components/SpeechRecognition';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Voice-Controlled Coding Assistant</h1>
      <SpeechRecognitionComponent />
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Home;
