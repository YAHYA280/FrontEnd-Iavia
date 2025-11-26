import axios, { AxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IAVIA_GATEWAY_API_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // For now, no authentication token
    // When authentication is implemented, add token here:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Success [${response.config.method?.toUpperCase()}] ${response.config.url}:`, response.status);
    }
    return response;
  },
  (error) => {
    // Extract error message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';

    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ API Error [${error.config?.method?.toUpperCase()}] ${error.config?.url}:`, {
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data,
      });
    }

    return Promise.reject(
      (error.response && error.response.data) || errorMessage
    );
  }
);

export default axiosInstance;
