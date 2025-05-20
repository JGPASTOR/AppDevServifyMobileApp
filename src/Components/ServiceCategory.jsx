import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceCategory = ({ icon, name, color, onPress }) => (
  <TouchableOpacity style={styles.category} onPress={onPress}>
    <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.categoryText}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  category: {
    alignItems: "center",
    width: 80,
    marginHorizontal: 8,
  },
  categoryIcon: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ServiceCategory;
