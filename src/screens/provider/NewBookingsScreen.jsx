import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProviderHeader from '../../Components/ProviderHeader';
import BookingCard from '../../Components/BookingCard';

const NewBookingsScreen = () => {
    const navigation = useNavigation();
    const [bookings] = useState([
        {
            id: '1',
            serviceType: 'Aircon Cleaning',
            clientName: 'Clarence Buenaflor',
            address: 'Brgy. San Juan Surigao City',
            contactNumber: '09406135125',
            date: '2025-03-27',
            amount: '500',
        },
    ]);

    const handleAccept = (bookingId) => {
        navigation.navigate('ProviderApp', {
            screen: 'ProviderBookings',
            params: { screen: 'OngoingBookings' }
        });
    };

    const handleDecline = (bookingId) => {
        navigation.navigate('ProviderApp', {
            screen: 'ProviderBookings',
            params: { screen: 'DeclinedBookings' }
        });
    };

    return (
        <View style={styles.container}>
            <ProviderHeader title="New Bookings" />
            <ScrollView style={styles.scrollView}>
                {bookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        status="pending"
                        showActions={true}
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
});

export default NewBookingsScreen; 