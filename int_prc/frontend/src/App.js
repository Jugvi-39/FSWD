// frontend/src/App.js
import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("register");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MERN Auth Portal</h1>
      <button onClick={() => setPage("register")}>Register</button>
      <button onClick={() => setPage("login")}>Login</button>

      {page === "register" ? <Register /> : <Login />}
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Submitting...");
    try {
      const res = await fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        // Try to parse JSON error, otherwise read text
        if (contentType.includes("application/json")) {
          const errJson = await res.json();
          return setMsg(errJson.message || "Request failed");
        }
        const errText = await res.text();
        return setMsg(errText || `Request failed with status ${res.status}`);
      }

      const data = contentType.includes("application/json") ? await res.json() : { message: await res.text() };
      setMsg(data.message || "Success");
    } catch (error) {
      setMsg("Network error. Is the backend running on http://localhost:5000?");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br/>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br/>
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Submitting...");
    try {
      const res = await fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errJson = await res.json();
          return setMsg(errJson.message || "Request failed");
        }
        const errText = await res.text();
        return setMsg(errText || `Request failed with status ${res.status}`);
      }

      const data = contentType.includes("application/json") ? await res.json() : { message: await res.text() };
      setMsg(data.message || "Success");
    } catch (error) {
      setMsg("Network error. Is the backend running on http://localhost:5000?");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default App;
