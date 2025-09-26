import axios from "axios";

const rawBase = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
let base = (rawBase || "").trim();
// remove trailing slash(es)
while (base.endsWith("/")) base = base.slice(0, -1);
// ensure a single /api suffix
if (!base.toLowerCase().endsWith("/api")) base = `${base}/api`;

const api = axios.create({
  baseURL: base,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


