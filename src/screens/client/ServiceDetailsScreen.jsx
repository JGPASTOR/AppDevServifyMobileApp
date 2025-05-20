import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClientHeader from '../../Components/ClientHeader';
import { serviceService } from '../../services/api';

// Default images
const DEFAULT_SERVICE_IMAGE = require('../../../assets/images/default-service.png');
const DEFAULT_PROVIDER_IMAGE = require('../../../assets/images/default-profile.png');

const ServiceDetailsScreen = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServiceDetails();
    }, []);

    const loadServiceDetails = async () => {
        try {
            setLoading(true);
            const serviceData = await serviceService.getById(serviceId);
            setService(serviceData);
        } catch (error) {
            console.error('Error loading service details:', error);
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

    if (!service) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Service not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ClientHeader
                title="Service Details"
                showBackButton
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={service.image_url ? { uri: service.image_url } : DEFAULT_SERVICE_IMAGE}
                    style={styles.serviceImage}
                    resizeMode="cover"
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.servicePrice}>${service.price}</Text>

                    <View style={styles.providerInfo}>
                        <Image
                            source={service.provider.profile_image ? { uri: service.provider.profile_image } : DEFAULT_PROVIDER_IMAGE}
                            style={styles.providerImage}
                        />
                        <View style={styles.providerDetails}>
                            <Text style={styles.providerName}>{service.provider.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.ratingText}>{service.provider.rating}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{service.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What's Included</Text>
                        {service.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Duration</Text>
                        <Text style={styles.duration}>{service.duration} minutes</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('CreateBooking', { service })}
                >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
    },
    serviceImage: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        padding: 20,
    },
    serviceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    servicePrice: {
        fontSize: 20,
        color: '#8072FF',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    providerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    providerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    providerDetails: {
        flex: 1,
    },
    providerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        color: '#666',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    duration: {
        fontSize: 16,
        color: '#666',
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    bookButton: {
        backgroundColor: '#8072FF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ServiceDetailsScreen; 