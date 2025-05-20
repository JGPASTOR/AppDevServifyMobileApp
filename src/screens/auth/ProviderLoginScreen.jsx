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
} from "react-native";

const dummyProviders = [
    {
        username: "sp1",
        password: "sp1",
    },
];

const ProviderLoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        const provider = dummyProviders.find(
            (provider) => provider.username === username && provider.password === password
        );

        if (provider) {

            navigation.replace("ProviderApp");
        } else {
            setError("Invalid username or password");
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

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Sign In</Text>
                        <Text style={styles.subtitle}>Service Provider</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#999"
                        />

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.rememberContainer}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                    {rememberMe && <View style={styles.checkboxInner} />}
                                </View>
                                <Text style={styles.rememberText}>Remember Me</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <View style={styles.clientLoginContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ClientLoginScreen")}
                            >
                                <Text style={styles.clientLoginLink}>Back to client login</Text>
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
        height: 110,
        marginBottom: 100,
    },
    titleContainer: {
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center",
        color: "#000000",
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center",
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
        color: "#000000",
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
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    clientLoginContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 10,
    },
    clientLoginLink: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});

export default ProviderLoginScreen; 