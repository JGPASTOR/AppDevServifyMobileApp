import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServiceCard = ({ service, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Image source={service.image} style={styles.serviceImage} />
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{service.title}</Text>
                    <Text style={styles.description}>{service.description}</Text>
                    <Text style={styles.price}>₱{service.price}</Text>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={[styles.status, service.booked && styles.bookedStatus]}>
                        {service.booked ? 'Booked' : 'Available'}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>Delete Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={onEdit}
                    >
                        <Text style={[styles.buttonText, styles.editButtonText]}>Edit Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E5E2FF',
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    serviceImage: {
        width: 120,
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        padding: 12,
    },
    textContainer: {
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8072FF',
        marginTop: 4,
    },
    statusContainer: {
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    bookedStatus: {
        color: '#FFC107',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    editButton: {
        backgroundColor: '#8072FF',
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default ServiceCard; 