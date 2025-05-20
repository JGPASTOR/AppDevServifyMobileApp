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
    ActivityIndicator,
    Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginClient } from '../../services/api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Input validation
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            console.log('Starting login process...');
            const response = await loginClient({ email, password });
            console.log('Login response received:', response);

            if (response.token) {
                // Store the user data and token
                await AsyncStorage.setItem('userData', JSON.stringify(response.user));
                await AsyncStorage.setItem('token', response.token);

                // Show success message
                Alert.alert(
                    'Success',
                    'Login successful!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.replace('ClientHome')
                        }
                    ]
                );
            } else {
                throw new Error('No token received from server');
            }
        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = "An error occurred during login. Please try again.";

            if (error.message === 'Network Error') {
                errorMessage = "Cannot connect to the server. Please check your internet connection and try again.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
            Alert.alert('Login Failed', errorMessage);
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

                    <Text style={styles.title}>Sign In</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setError(""); // Clear error when user types
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                            editable={!isLoading}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setError(""); // Clear error when user types
                            }}
                            secureTextEntry
                            placeholderTextColor="#999"
                            editable={!isLoading}
                        />

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.rememberContainer}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                                disabled={isLoading}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                    {rememberMe && <View style={styles.checkboxInner} />}
                                </View>
                                <Text style={styles.rememberText}>Remember Me</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}
                                disabled={isLoading}
                            >
                                <Text style={styles.registerLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.providerContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProviderLogin")}
                                disabled={isLoading}
                            >
                                <Text style={styles.providerLink}>Login as Service Provider</Text>
                            </TouchableOpacity>
                        </View>
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
        width: 150,
        height: 150,
        marginBottom: 5,
    },
    logoText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: 1,
    },
    locationText: {
        fontSize: 15,
        color: "#000000",
        marginTop: -5,
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
    },
    input: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 15,
        paddingLeft: 20,
        marginBottom: 15,
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
    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#aaa",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "white",
    },
    checkboxChecked: {
        borderColor: "#8072FF",
    },
    checkboxInner: {
        height: 12,
        width: 12,
        backgroundColor: "#8072FF",
        borderRadius: 2,
    },
    rememberText: {
        color: "#000000",
        fontSize: 15,
    },
    button: {
        backgroundColor: "#8072FF",
        borderRadius: 30,
        padding: 15,
        alignItems: "center",
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
    registerContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    registerText: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 5,
    },
    registerLink: {
        color: "#8072FF",
        fontWeight: "bold",
        fontSize: 18,
    },
    providerContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 10,
    },
    providerLink: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 50,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});

export default LoginScreen; 