import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookingCard from '../../Components/BookingCard';
import ProviderHeader from '../../Components/ProviderHeader';

const DeclinedBookingsScreen = ({ navigation }) => {
    const [bookings, setBookings] = useState([
        {
            id: '1',
            serviceType: 'Plumbing',
            clientName: 'Clarence Buenaflor',
            address: 'Surigao city, Surigao del norte',
            contactNumber: '+639123456789',
            date: '2025-04-22',
            amount: '500',
            status: 'declined',
            statusColor: '#FF0000',
            statusIcon: 'close-circle',
        },
    ]);

    return (
        <View style={styles.container}>
            <ProviderHeader title="Declined Bookings" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {bookings.map(booking => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        showActions={false}
                        status={booking.status}
                        statusColor={booking.statusColor}
                        statusIcon={booking.statusIcon}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
});

export default DeclinedBookingsScreen; 