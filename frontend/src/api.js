import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Your backend runs on port 3001
});

export default api;