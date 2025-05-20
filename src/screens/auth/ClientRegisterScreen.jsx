import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerClient } from '../../services/api';

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        // Name Validation
        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Name is required';
        } else if (!nameRegex.test(formData.full_name)) {
            newErrors.full_name = 'Name can only contain letters and spaces';
        } else if (formData.full_name.length < 3) {
            newErrors.full_name = 'Name must be at least 3 characters long';
        }

        // Email Validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password Validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Password Confirmation Validation
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Please confirm your password';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await registerClient(formData);

            if (response.user) {
                // Store the user data and token
                await AsyncStorage.setItem('userData', JSON.stringify(response.user));
                await AsyncStorage.setItem('token', response.token);

                // Show success message
                Alert.alert(
                    'Success',
                    response.message || 'Registration successful!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.replace('Login')
                        }
                    ]
                );
            }
        } catch (error) {
            console.log("Registration error:", error);

            if (error.errors) {
                setErrors(error.errors);
                Alert.alert(
                    'Registration Error',
                    Object.values(error.errors)[0][0]
                );
            } else {
                Alert.alert(
                    'Registration Error',
                    error.message || 'An error occurred during registration.'
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("../../../assets/ServiceBG.png")}
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../../assets/LOGO.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.title}>Register</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={[styles.input, errors.full_name && styles.inputError]}
                            placeholder="Enter your name"
                            value={formData.full_name}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, full_name: text }));
                                if (errors.full_name) setErrors(prev => ({ ...prev, full_name: null }));
                            }}
                        />
                        {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, email: text }));
                                if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                            }}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Enter your password"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, password: text }));
                                if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                            }}
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={[styles.input, errors.password_confirmation && styles.inputError]}
                            placeholder="Confirm your password"
                            secureTextEntry
                            value={formData.password_confirmation}
                            onChangeText={(text) => {
                                setFormData(prev => ({ ...prev, password_confirmation: text }));
                                if (errors.password_confirmation) setErrors(prev => ({ ...prev, password_confirmation: null }));
                            }}
                        />
                        {errors.password_confirmation && <Text style={styles.errorText}>{errors.password_confirmation}</Text>}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Register</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already Have Account?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 140,
        height: 120,
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "Regular",
        marginBottom: 25,
        textAlign: "left",
        color: "#000000",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 15,
        paddingLeft: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputError: {
        borderColor: '#ff4444',
        borderWidth: 1,
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#8072FF",
        borderRadius: 30,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    loginText: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 5,
    },
    loginLink: {
        color: "#8072FF",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default RegisterScreen; 