// src/components/SpeechRecognition.jsx
import React, { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(currentTranscript);
    };
  }, []);

  const handleListen = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={handleListen}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
