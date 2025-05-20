import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceProvider = ({ provider, onPress }) => (
  <TouchableOpacity style={styles.providerCard} onPress={onPress}>
    <Image
      source={typeof provider.image === 'string' ? { uri: provider.image } : provider.image}
      style={styles.providerImage}
    />
    <Text style={styles.providerName}>{provider.name}</Text>
    <View style={styles.ratingContainer}>
      <Ionicons name="star" size={16} color="#FFC107" />
      <Text style={styles.ratingText}>
        {provider.rating} ({provider.reviews})
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  providerCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 10,
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
  providerImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  providerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 4,
    marginHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});

export default ServiceProvider;
