import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null); // 'client' or 'provider'

    useEffect(() => {
        // Check for stored token on app load
        loadStoredToken();
    }, []);

    const loadStoredToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUserType = await AsyncStorage.getItem('userType');

            if (storedToken) {
                setToken(storedToken);
                setUserType(storedUserType);
                // Set default axios header
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                // Fetch user data
                await fetchUserData();
            }
        } catch (error) {
            console.error('Error loading stored token:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}/user`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // If token is invalid, clear everything
            if (error.response?.status === 401) {
                await logout();
            }
        }
    };

    const login = async (email, password, type) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/${type}/login`, {
                email,
                password,
            });

            const { token: newToken, user: userData } = response.data;

            // Store token and user type
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('userType', type);

            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            setToken(newToken);
            setUser(userData);
            setUserType(type);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'An error occurred during login'
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData, type) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/${type}/register`, userData);

            const { token: newToken, user: newUser } = response.data;

            // Store token and user type
            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('userType', type);

            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            setToken(newToken);
            setUser(newUser);
            setUserType(type);

            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'An error occurred during registration'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            // Call logout endpoint
            await axios.post(`${API_URL}/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear everything regardless of API call success
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userType');
            delete axios.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
            setUserType(null);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                userType,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 