import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const isAuthed = () => !!localStorage.getItem("token");
const PrivateRoute = ({ children }) => (isAuthed() ? children : <Navigate to="/login" replace />);

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav">
          <Link className="brand" to="/">App</Link>
          <span className="spacer" />
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
