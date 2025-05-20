import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { authService } from '../../services/api';

const TestConnection = () => {
    const [status, setStatus] = useState('Testing connection...');
    const [error, setError] = useState(null);

    const testConnection = async () => {
        try {
            setStatus('Testing connection...');
            setError(null);

            // Try to register a test user
            const testUser = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'client',
                firstName: 'Test',
                lastName: 'User',
                contactNumber: '1234567890',
                address: 'Test Address'
            };

            const response = await authService.register(testUser);
            setStatus('Connection successful! User registered.');
            console.log('Response:', response);
        } catch (err) {
            setError(err.message);
            setStatus('Connection failed');
            console.error('Error:', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>API Connection Test</Text>
            <Text style={styles.status}>{status}</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Test Connection" onPress={testConnection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    status: {
        fontSize: 16,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default TestConnection; 