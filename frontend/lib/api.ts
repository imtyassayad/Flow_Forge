import axios from 'axios';

// Create api instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true // Disabled for Token Auth
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
    // Check LocalStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        console.log("API Interceptor - Token found:", token ? "Yes" : "No", token); // DEBUG
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("API Interceptor - Header set:", config.headers.Authorization); // DEBUG
        }
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            console.warn('Unauthorized access');
             if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
                window.location.href = '/login'; // Force Redirect
            }
        }
        return Promise.reject(error);
    }
);

export default api;
