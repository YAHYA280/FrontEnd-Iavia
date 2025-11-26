import { GATEWAY_API_URL } from '@/config-global';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({ 
  baseURL: GATEWAY_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let configInitialized = false;
let initializationPromise: Promise<void> | null = null;

const initializeAxiosConfig = async () => {
  if (initializationPromise) {
    return initializationPromise;
  }

  if (configInitialized && axiosInstance.defaults.baseURL && axiosInstance.defaults.baseURL !== '') {
    return;
  }

  initializationPromise = (async () => {
    try {
      if (GATEWAY_API_URL) {
        axiosInstance.defaults.baseURL = GATEWAY_API_URL;
        configInitialized = true;
      }
    } finally {
      initializationPromise = null;
    }
  })();

  return initializationPromise;
};

initializeAxiosConfig();

axiosInstance.interceptors.request.use(
  async (config) => {
    await initializeAxiosConfig();

    if (!axiosInstance.defaults.baseURL || axiosInstance.defaults.baseURL === '') {
      configInitialized = false;
      await initializeAxiosConfig();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (
  args: string | [string, AxiosRequestConfig],
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  data?: any
) => {
  await initializeAxiosConfig();

  const [url, config] = Array.isArray(args) ? args : [args];
  const axiosConfig = { ...config, method };

  if (method === 'post' || method === 'put' || method === 'patch') {
    axiosConfig.data = data;
  }

  const res = await axiosInstance(url, axiosConfig);
  return res.data;
};