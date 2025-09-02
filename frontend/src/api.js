import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, 
  
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("API BASE:", import.meta.env.VITE_API_BASE);

  return config;
});

export default api;
