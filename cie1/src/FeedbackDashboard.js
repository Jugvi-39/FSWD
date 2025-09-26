import React, { useState, useEffect } from 'react';
import './App.css'; // Optional: if using CSS
// import './FeedbackDashboard.css'; // Optional: if using separate CSS

function App() {
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
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <input type="text" placeholder="First Name" className="border p-2 mr-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Surname" className="border p-2" value={surname} onChange={(e) => setSurname(e.target.value)} />
        {firstName && surname && (
          <h2 className="mt-4 text-xl font-bold text-green-700">
            ➤ Welcome, {firstName} {surname}!
          </h2>
        )}
      </div>

      <div className="mb-4 text-lg font-mono text-blue-600">
        Current Time: {time.toLocaleString()}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Rate the Session:</h3>
        {['Excellent', 'Good', 'Average', 'Poor'].map(type => (
          <button key={type} onClick={() => handleVote(type)} className="bg-blue-500 text-white px-3 py-1 m-1 rounded">
            {type}
          </button>
        ))}
        <div className="mt-2">
          {Object.entries(feedback).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Your Feedback Counter: {userCount}</h3>
        <button onClick={() => setUserCount(prev => prev + 1)} className="bg-green-500 text-white px-3 py-1 m-1 rounded">Increment</button>
        <button onClick={() => setUserCount(prev => Math.max(0, prev - 1))} className="bg-yellow-500 text-white px-3 py-1 m-1 rounded">Decrement</button>
        <button onClick={() => setUserCount(0)} className="bg-red-500 text-white px-3 py-1 m-1 rounded">Reset</button>
        <button onClick={() => setUserCount(prev => prev + 5)} className="bg-purple-500 text-white px-3 py-1 m-1 rounded">Increment by 5</button>
      </div>
    </div>
  );
}

export default App;
