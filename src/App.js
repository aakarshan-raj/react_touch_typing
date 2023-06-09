import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  const [currentKey, setCurrentKey] = useState('');
  const [nextKey, setNextKey] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
  }, [timer]);

  const getRandomKey = () => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    setCurrentKey(key.toLowerCase());

    if (key.toLowerCase() === nextKey) {
      setNextKey(getRandomKey());
      setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);
    } else {
      setMistakes((prevMistakes) => prevMistakes + 1);
    }
  };

  useEffect(() => {
    const accuracyPercentage =
      keysPressed > 0
        ? Math.round(((keysPressed - mistakes) / keysPressed) * 100)
        : 100;

    const clampedAccuracy = accuracyPercentage >= 0 ? accuracyPercentage : 0;
    setAccuracy(clampedAccuracy);
  }, [keysPressed, mistakes]);

  useEffect(() => {
    setNextKey(getRandomKey());
  }, []);

  return (
    <div>
    <h1 className="title">TOUCH TYPING PRACTICE</h1>

    <div className="container">
      <div className="info-container">
        <div className="info">
          <span className="label">Time Remaining:</span>
          <span className="value">{timer >= 0 ? timer : 0} seconds</span>
        </div>
        <div className="info">
          <span className="label">Keys Pressed:</span>
          <span className="value">{keysPressed}</span>
        </div>
        <div className="info">
          <span className="label">Accuracy:</span>
          <span className="value">{accuracy}%</span>
        </div>
      </div>
      <div className="key-info">
        <span className="label">Next Key:</span>
        <span className="value">{nextKey}</span>
      </div>
      <div className="key-info">
        <span className="label">Current Key:</span>
        <span className="value">{currentKey}</span>
      </div>
      <input
        type="text"
        className="typing-box"
        value={currentKey}
        onChange={() => {}}
        onKeyDown={handleKeyPress}
        autoFocus={true}
      />
       <div className="reset-button">
      <button onClick={() => window.location.reload()}>{'Reset'}</button>
    </div>
    </div>
    </div>
  );
};

export default App;
