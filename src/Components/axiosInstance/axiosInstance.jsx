// Create axios instance in a separate file (e.g., api.js)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Include credentials with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
