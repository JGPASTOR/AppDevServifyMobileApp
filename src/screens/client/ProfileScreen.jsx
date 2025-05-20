import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        id: 1,
        name: "Clarence Buenaflor",
        email: "buenaflor@gmail.com",
        phone: "+1 234 567 8900",
        address: "123 Main St, New York, NY 10001",
        profileImage: require("../../../assets/images/ClientProfile.jpg"),
        favoriteServices: 5,
        completedBookings: 2,
    });

    const menuItems = [
        {
            id: 1,
            title: "Personal Information",
            icon: "person-outline",
            screen: "PersonalInfo",
        },
        {
            id: 2,
            title: "Favorite Services",
            icon: "heart-outline",
            screen: "FavoriteServices",
        },
        {
            id: 3,
            title: "Notifications",
            icon: "notifications-outline",
            screen: "Notifications",
        },
        {
            id: 4,
            title: "Payment Methods",
            icon: "card-outline",
            screen: "PaymentMethods",
        },
        {
            id: 5,
            title: "Address Book",
            icon: "location-outline",
            screen: "AddressBook",
        },
        {
            id: 6,
            title: "Help & Support",
            icon: "help-circle-outline",
            screen: "HelpSupport",
        },
        {
            id: 7,
            title: "About Us",
            icon: "information-circle-outline",
            screen: "AboutUs",
        },
        {
            id: 8,
            title: "Terms & Privacy Policy",
            icon: "document-text-outline",
            screen: "TermsPrivacy",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <Ionicons name="settings-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={user.profileImage}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editProfileImageButton}>
                            <Ionicons name="camera-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.favoriteServices}</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.completedBookings}</Text>
                            <Text style={styles.statLabel}>Bookings</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuSection}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <View style={styles.menuItemLeft}>
                                <Ionicons name={item.icon} size={22} color="#8072FF" />
                                <Text style={styles.menuItemTitle}>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        if (Platform.OS === 'web') {
                            const confirmed = window.confirm('Are you sure you want to logout?');
                            if (confirmed) {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'ClientLoginScreen' }]
                                });
                            }
                        } else {
                            Alert.alert(
                                'Logout',
                                'Are you sure you want to logout?',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Logout',
                                        style: 'destructive',
                                        onPress: () => {
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'ClientLoginScreen' }]
                                            });
                                        },
                                    },
                                ],
                                { cancelable: true }
                            );
                        }
                    }}
                >
                    <Ionicons name="log-out-outline" size={22} color="#F44336" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    settingsButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    profileSection: {
        alignItems: "center",
        paddingVertical: 20,
    },
    profileImageContainer: {
        position: "relative",
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editProfileImageButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#8072FF",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    statItem: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#8072FF",
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },
    statDivider: {
        width: 1,
        backgroundColor: "#eee",
        height: "100%",
    },
    editProfileButton: {
        backgroundColor: "#8072FF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    editProfileButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    menuSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemTitle: {
        fontSize: 16,
        color: "#333",
        marginLeft: 15,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 30,
        paddingVertical: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    logoutButtonText: {
        fontSize: 16,
        color: "#F44336",
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default ProfileScreen; 