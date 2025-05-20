import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { categoryService, serviceService, bookingService, authService } from '../../services/api';
import ClientHeader from '../../Components/ClientHeader';

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [providers, setProviders] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [categoriesData, providersData, bookingsData, userData] = await Promise.all([
                categoryService.getAll(),
                serviceService.getAll(),
                bookingService.getAll(),
                authService.getProfile()
            ]);

            setCategories(categoriesData);
            setProviders(providersData);
            setRecentBookings(bookingsData.slice(0, 2)); // Get only 2 most recent bookings
            setUser(userData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8072FF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ClientHeader
                title="Home"
                showProfile
                onProfilePress={() => navigation.navigate('Profile')}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeContainer}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
                    </View>
                    <Image
                        source={user?.profile_image ? { uri: user.profile_image } : DEFAULT_PROFILE_IMAGE}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Service Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={styles.categoryCard}
                                onPress={() => navigation.navigate('CategoryServices', { category })}
                            >
                                <Image
                                    source={{ uri: category.image_url }}
                                    style={styles.categoryImage}
                                />
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Service Providers</Text>
                    {providers.map((provider) => (
                        <TouchableOpacity
                            key={provider.id}
                            style={styles.providerCard}
                            onPress={() => navigation.navigate('ProviderDetails', { provider })}
                        >
                            <Image
                                source={provider.profile_image ? { uri: provider.profile_image } : DEFAULT_PROFILE_IMAGE}
                                style={styles.providerImage}
                            />
                            <View style={styles.providerInfo}>
                                <Text style={styles.providerName}>{provider.name}</Text>
                                <Text style={styles.providerService}>{provider.service_type}</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Text style={styles.ratingText}>{provider.rating}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Bookings</Text>
                    {recentBookings.map((booking) => (
                        <TouchableOpacity
                            key={booking.id}
                            style={styles.bookingCard}
                            onPress={() => navigation.navigate('BookingDetails', { booking })}
                        >
                            <View style={styles.bookingInfo}>
                                <Text style={styles.bookingService}>{booking.service.title}</Text>
                                <Text style={styles.bookingDate}>{new Date(booking.date).toLocaleDateString()}</Text>
                                <Text style={styles.bookingStatus}>{booking.status}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#666" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    welcomeText: {
        fontSize: 16,
        color: "#666",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
    },
    categoryCard: {
        width: 120,
        marginRight: 16,
    },
    categoryImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },
    providerCard: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    providerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    providerInfo: {
        flex: 1,
    },
    providerName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    providerService: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        marginLeft: 4,
        color: "#666",
    },
    bookingCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    bookingInfo: {
        flex: 1,
    },
    bookingService: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    bookingDate: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    bookingStatus: {
        fontSize: 14,
        color: "#4CAF50",
    },
});

export default HomeScreen; 