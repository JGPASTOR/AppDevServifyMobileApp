import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configure API URL based on platform and environment
const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        // For Android Emulator
        return 'http://10.0.2.2:8000/api';
    } else if (Platform.OS === 'ios') {
        // For iOS Simulator
        return 'http://localhost:8000/api';
    }
    // For physical devices, replace with your computer's IP address
    return 'http://192.168.1.100:8000/api'; // Replace with your actual IP
};

const API_URL = getBaseUrl();

console.log('Current Platform:', Platform.OS);
console.log('Using API URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 second timeout
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log('Making request to:', config.url);
            return config;
        } catch (error) {
            console.error('Request interceptor error:', error);
            return Promise.reject(error);
        }
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status);
        return response;
    },
    async (error) => {
        if (error.message === 'Network Error') {
            console.error('Network Error - Please check if:');
            console.error('1. The Laravel server is running with: php artisan serve --host=0.0.0.0');
            console.error('2. You are using an Android emulator (API URL should be 10.0.2.2)');
            console.error('3. The Laravel server is accessible from the emulator');
            console.error('4. Your IP address is correctly set in the API configuration');
        }

        console.error('Response error details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status,
        });

        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userData');
        }
        return Promise.reject(error);
    }
);

export const registerClient = async (userData) => {
    try {
        console.log('Attempting to register with data:', userData);
        const response = await api.post('/auth/client/register', userData);
        console.log('Registration successful');
        return response.data;
    } catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        throw error.response?.data || error.message;
    }
};

export const loginClient = async (credentials) => {
    try {
        console.log('Attempting login with:', { email: credentials.email });
        const response = await api.post('/auth/client/login', credentials);
        console.log('Login successful');
        return response.data;
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        throw error.response?.data || error.message;
    }
};

export const logoutClient = async () => {
    try {
        await api.post('/logout');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
    } catch (error) {
        console.error('Logout error:', error);
        throw error.response?.data || error.message;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.error('Get user error:', error);
        throw error.response?.data || error.message;
    }
};

export default api;

// Auth Services
export const authService = {
    clientLogin: async (email, password) => {
        const response = await fetch(`${API_URL}/client/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    clientRegister: async (userData) => {
        const response = await fetch(`${API_URL}/client/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    providerLogin: async (email, password) => {
        const response = await fetch(`${API_URL}/provider/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    providerRegister: async (userData) => {
        const response = await fetch(`${API_URL}/provider/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    logout: async (token) => {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    getProfile: async (token) => {
        const response = await fetch(`${API_URL}/user`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },
};

// Client Services
export const clientService = {
    getProfile: async (token) => {
        const response = await fetch(`${API_URL}/client/profile`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    updateProfile: async (token, profileData) => {
        const response = await fetch(`${API_URL}/client/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });
        return handleResponse(response);
    },

    getBookings: async (token) => {
        const response = await fetch(`${API_URL}/client/bookings`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    createBooking: async (token, bookingData) => {
        const response = await fetch(`${API_URL}/client/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
        });
        return handleResponse(response);
    },
};

// Provider Services
export const providerService = {
    getProfile: async (token) => {
        const response = await fetch(`${API_URL}/provider/profile`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    updateProfile: async (token, profileData) => {
        const response = await fetch(`${API_URL}/provider/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });
        return handleResponse(response);
    },

    getServices: async (token) => {
        const response = await fetch(`${API_URL}/provider/services`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    createService: async (token, serviceData) => {
        const response = await fetch(`${API_URL}/provider/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(serviceData),
        });
        return handleResponse(response);
    },

    getBookings: async (token) => {
        const response = await fetch(`${API_URL}/provider/bookings`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },
};

// Service Categories
export const categoryService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/categories`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/categories/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },
};

// Services
export const serviceService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/services`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/services/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },

    create: async (serviceData) => {
        const response = await fetch(`${API_URL}/services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });
        return handleResponse(response);
    },

    update: async (id, serviceData) => {
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(serviceData),
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },
};

// Bookings
export const bookingService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/bookings`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },

    create: async (bookingData) => {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        return handleResponse(response);
    },

    update: async (id, bookingData) => {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });
        return handleResponse(response);
    },
}; 