// src/components/SpeechRecognition.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`);
    };
  }, []);

  const handleListen = () => {
    setError('');
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(prevState => !prevState);
  };

  const handleClear = () => {
    setTranscript('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <button onClick={handleListen}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button onClick={handleClear} disabled={!transcript}>
          Clear Transcript
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
