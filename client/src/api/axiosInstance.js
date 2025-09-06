import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ||'http://localhost:4000/api',
  withCredentials: true, // Enable sending cookies
});

// Add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

// Quiz APIs
// export const getQuizzes = () => API.get('/quiz');
// export const getQuizById = (id) => API.get(`/quiz/${id}`);
// export const deleteQuiz = (id) => API.delete(`/quiz/${id}`);
// export const createQuiz = (data) => API.post('/quiz/create', data);
// export const submitQuiz = (id, data) => API.post(`/quiz/${id}/submit`, data);

export default API;
