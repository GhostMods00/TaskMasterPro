import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error);
      throw new Error('Network error occurred. Please check your connection.');
    }

    // Handle other errors
    const errorMessage = (error.response?.data as { message?: string })?.message || 'An unexpected error occurred';
    console.error('API Response Error:', errorMessage);
    throw error;
  }
);

// Task API
export const addTask = async (projectId: number, taskData: any) => {
  return await api.post(`/tasks/${projectId}/tasks`, taskData);
};

export const fetchTasks = async (projectId: number) => {
  return await api.get(`/tasks/${projectId}/tasks`);
};

export const updateTask = async (taskId: number, taskData: any) => {
  return await api.put(`/tasks/tasks/${taskId}`, taskData);
};

export const deleteTask = async (taskId: number) => {
  return await api.delete(`/tasks/tasks/${taskId}`);
};

// Project API
export const fetchProjects = async () => {
  return await api.get('/projects');
};

export const addProject = async (projectData: any) => {
  return await api.post('/projects', projectData);
};

export const updateProject = async (projectId: number, projectData: any) => {
  return await api.put(`/projects/${projectId}`, projectData);
};

export const deleteProject = async (projectId: number) => {
  return await api.delete(`/projects/${projectId}`);
};

export default api;

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API errors
export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.data?.message || 'An unexpected error occurred',
      error.response?.status,
      error.response?.data?.code
    );
  }
  throw new ApiError('An unexpected error occurred');
};
