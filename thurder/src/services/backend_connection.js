import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for handling request config
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed in the future
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    const errorResponse = {
      success: false,
      message: 'An error occurred',
      error: 'Unknown error'
    };

    if (error.response) {
      // Server responded with an error status code
      errorResponse.message = error.response.data.message || 'Server error';
      errorResponse.error = error.response.data.error || error.response.status;
    } else if (error.request) {
      // Request was made but no response received
      errorResponse.message = 'No response from server';
      errorResponse.error = 'Network error';
    } else {
      // Error in setting up the request
      errorResponse.message = error.message;
      errorResponse.error = 'Request configuration error';
    }

    return Promise.reject(errorResponse);
  }
);

// Generic request methods
const BackendService = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      return await api.get(endpoint, { params });
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data = {}) => {
    try {
      return await api.post(endpoint, data);
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error);
      throw error;
    }
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    try {
      return await api.put(endpoint, data);
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error);
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      return await api.delete(endpoint);
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error);
      throw error;
    }
  }
};

export default BackendService;