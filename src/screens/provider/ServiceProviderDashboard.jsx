import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProviderHeader from '../../Components/ProviderHeader';

const StatCard = ({ title, value, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.statCard}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
    </TouchableOpacity>
);

const ServiceProviderDashboard = () => {
    const navigation = useNavigation();

    const handleBookingsPress = () => {
        navigation.navigate('Bookings', { screen: 'NewBookings' });
    };

    const handleServicesPress = () => {
        navigation.navigate('Services');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProviderHeader title="Service Provider Dashboard" />
            <ScrollView style={styles.content}>
                <View style={styles.statsContainer}>
                    <StatCard
                        title="Total Bookings"
                        value="4"
                        onPress={() => navigation.navigate('ProviderApp', { screen: 'ReportsScreen' })}
                    />
                    <StatCard
                        title="Services"
                        value="2"
                        onPress={() => navigation.navigate('ProviderApp', { screen: 'ServicesScreen' })}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 8,
    },
    statCard: {
        backgroundColor: '#8072FF',
        borderRadius: 12,
        padding: 20,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
    },
});

export default ServiceProviderDashboard; 