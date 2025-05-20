import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceCategory from "../../Components/ServiceCategory";

// Dummy data for categories
const categoryData = [
    {
        id: 1,
        name: "Plumbing",
        icon: "water",
        color: "#4A86FF",
    },
    {
        id: 2,
        name: "Electrical",
        icon: "flash",
        color: "#FE9431",
    },
    {
        id: 3,
        name: "Cleaning",
        icon: "sparkles",
        color: "#39D7CE",
    },
    {
        id: 4,
        name: "Painting",
        icon: "color-palette",
        color: "#8573FF",
    },
    {
        id: 5,
        name: "Moving",
        icon: "cube",
        color: "#FF5C87",
    },
    {
        id: 6,
        name: "Electronics",
        icon: "laptop",
        color: "#3ACF6C",
    },
    {
        id: 7,
        name: "Carpentry",
        icon: "hammer",
        color: "#BA68C8",
    },
    {
        id: 8,
        name: "Gardening",
        icon: "leaf",
        color: "#4CAF50",
    },
];

// Dummy data for popular services
const popularServices = [
    {
        id: 1,
        name: "AC Repair",
        image: "https://source.unsplash.com/featured/?airconditioner",
        rating: 4.9,
        count: 289,
    },
    {
        id: 2,
        name: "House Cleaning",
        image: "https://source.unsplash.com/featured/?cleaning",
        rating: 4.8,
        count: 156,
    },
    {
        id: 3,
        name: "Plumbing Services",
        image: "https://source.unsplash.com/featured/?plumbing",
        rating: 4.7,
        count: 213,
    },
    {
        id: 4,
        name: "Pest Control",
        image: "https://source.unsplash.com/featured/?pestcontrol",
        rating: 4.8,
        count: 178,
    },
];

const ServicesScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const renderPopularServices = () => {
        return popularServices.map((service) => (
            <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() =>
                    navigation.navigate("ServiceDetails", { serviceId: service.id })
                }
            >
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFC107" />
                    <Text style={styles.ratingText}>
                        {service.rating} ({service.count})
                    </Text>
                </View>
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Services</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for services..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchQuery("")}
                        >
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categoryData.map((category) => (
                        <ServiceCategory
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            color={category.color}
                            onPress={() =>
                                navigation.navigate("CategoryServices", { category })
                            }
                        />
                    ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular Services</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AllServices")}
                    >
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.servicesContainer}>{renderPopularServices()}</View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 15,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "#333",
    },
    clearButton: {
        padding: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginHorizontal: 20,
        marginBottom: 15,
    },
    categoriesContainer: {
        paddingHorizontal: 15,
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 15,
    },
    viewAllText: {
        color: "#8072FF",
        fontWeight: "600",
    },
    servicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    serviceCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: "hidden",
    },
    serviceImage: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginTop: 10,
        marginHorizontal: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    ratingText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 5,
    },
});

export default ServicesScreen; 