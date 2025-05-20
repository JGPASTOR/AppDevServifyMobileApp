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
import ServiceCategory from "../../Components/ServiceCategory";

const serviceCategories = [
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
        name: "House Cleaning",
        icon: "sparkles",
        color: "#39D7CE",
    },
    {
        id: 4,
        name: "Appliance",
        icon: "settings",
        color: "#8573FF",
    },
    {
        id: 5,
        name: "Carpentry",
        icon: "hammer",
        color: "#BA68C8",
    },
    {
        id: 6,
        name: "Pest Control",
        icon: "bug",
        color: "#4CAF50",
    },
    {
        id: 7,
        name: "Painting",
        icon: "color-palette",
        color: "#FF5C87",
    },
    {
        id: 8,
        name: "Aircon Cleaning",
        icon: "cube",
        color: "#3ACF6C",
    },
    {
        id: 9,
        name: "Massage Therapy",
        icon: "cube",
        color: "#3ACF6C",
    },

];

const AllServiceCategoriesScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Service Categories</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.categoriesGrid}>
                    {serviceCategories.map((category) => (
                        <ServiceCategory
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            color={category.color}
                            onPress={() => navigation.navigate('CategoryServices', { categoryId: category.id })}
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
        backgroundColor: "#fff",
        marginTop: 30,
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
        padding: 16,
        marginTop: 20,
    },
    categoriesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
});

export default AllServiceCategoriesScreen; 