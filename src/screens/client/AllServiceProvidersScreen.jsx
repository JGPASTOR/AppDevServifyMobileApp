import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServiceProvider from "../../Components/ServiceProvider";

const serviceProviders = [
    {
        id: 1,
        name: "Jester Pastor",
        rating: 4.8,
        reviews: 125,
        services: ["Plumbing"],
        image: require("../../../assets/images/plumbing.png"),
    },
    {
        id: 2,
        name: "Clarence Buenaflor",
        rating: 4.9,
        reviews: 210,
        services: ["Cleaning"],
        image: require("../../../assets/images/airconTech.png"),
    },
    {
        id: 3,
        name: "Elias",
        rating: 4.7,
        reviews: 98,
        services: ["Carpentry"],
        image: require("../../../assets/images/carpentry.png"),
    },
    {
        id: 4,
        name: "Johnson",
        rating: 4.6,
        reviews: 156,
        services: ["Painting"],
        image: require("../../../assets/images/painting.png"),
    },
    {
        id: 5,
        name: "Michael Brown",
        rating: 4.5,
        reviews: 89,
        services: ["Electrical"],
        image: require("../../../assets/images/electrical.png"),
    },
];

const AllServiceProvidersScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Top Service Providers</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.providersList}>
                    {serviceProviders.map((provider) => (
                        <ServiceProvider
                            key={provider.id}
                            provider={provider}
                            onPress={() => {
                                if (provider.name === "Jester Pastor") {
                                    navigation.navigate('CreateBooking', { provider });
                                } else {
                                    navigation.navigate('ProviderDetails', { providerId: provider.id });
                                }
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    content: {
        flex: 1,
        padding: 15,
        marginTop: 20,
    },
    providersList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    providerItem: {
        width: "30%",
        marginBottom: 16,
    },
});

export default AllServiceProvidersScreen; 