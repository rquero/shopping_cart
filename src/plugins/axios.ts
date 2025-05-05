import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Reemplaza con la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expirado o no válido');
    }
    return Promise.reject(error);
  }
);
export default apiClient
