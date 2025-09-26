import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        {token && <button onClick={logout} style={{ marginLeft: 10 }}>Logout</button>}
      </nav>

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to MERN Auth</h2>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
