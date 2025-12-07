import axios from 'axios';
//Creamos una sola conexion el backend 
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;