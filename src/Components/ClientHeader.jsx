import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClientHeader = ({ title, showBackButton, showProfile, onBackPress, onProfilePress }) => {
    return (
        <View style={styles.header}>
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.rightContainer}>
                {showProfile && (
                    <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
                        <Ionicons name="person-circle-outline" size={24} color="#333" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    leftContainer: {
        width: 40,
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    backButton: {
        padding: 4,
    },
    profileButton: {
        padding: 4,
    },
});

export default ClientHeader; 