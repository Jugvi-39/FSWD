import React, { useState, useEffect } from 'react';
import './dashboard.css';

export default function FeedbackDashboard() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [time, setTime] = useState(new Date());
  const [feedback, setFeedback] = useState({ Excellent: 0, Good: 0, Average: 0, Poor: 0 });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const options = ['Excellent', 'Good', 'Average', 'Poor'];
    const interval = setInterval(() => {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      setFeedback(prev => ({ ...prev, [randomOption]: prev[randomOption] + 1 }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (type) => {
    setFeedback(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setUserCount(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      <div classname="left-panel">
      <div className="greeting-section">
        <input
          type="text"
          placeholder="First Name"
          className="input-box"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="input-box"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        {firstName && surname && (
          <h2 className="welcome-msg">
            Welcome, {firstName} {surname}!
          </h2>
        )}
      </div>

      <div className="clock-display">
        Current Time: {time.toLocaleString()}
      </div>
      </div>

      <div className="feedback-panel">
        <div className="right-panel">
        <h3>Rate the Session:</h3>
        {['Excellent', 'Good', 'Average', 'Poor'].map(type => (
          <button
            key={type}
            onClick={() => handleVote(type)}
            className="feedback-btn"
          >
            {type}
          </button>
        ))}
        <div className="feedback-results">
          {Object.entries(feedback).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
          ))}
        </div>
        </div>
      </div>

      <div className="counter-panel">
        <div className="left-panel">
        <h3>Your Feedback Counter: {userCount}</h3>
        <button onClick={() => setUserCount(prev => prev + 1)} className="a1">Increment</button>
        <button onClick={() => setUserCount(prev => Math.max(0, prev - 1))} className="a2">Decrement</button>
        <button onClick={() => setUserCount(0)} className="a3">Reset</button>
        <button onClick={() => setUserCount(prev => prev + 5)} className="a4">Increment by 5</button>
        </div>
      </div>
    </div>
  );
}
