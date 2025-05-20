import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookingCard from '../../Components/BookingCard';
import ProviderHeader from '../../Components/ProviderHeader';

const CompletedBookingsScreen = ({ navigation }) => {
    const [bookings, setBookings] = useState([
        {
            id: '1',
            serviceType: 'Plumbing',
            clientName: 'Clarence Buenaflor',
            address: 'Surigao city, Surigao del norte',
            contactNumber: '+639123456789',
            date: '2025-04-22',
            amount: '500',
            status: 'completed',
            statusColor: '#32CD32',
            statusIcon: 'checkmark-circle',
            paidBy: 'Cash',
        },
    ]);

    return (
        <View style={styles.container}>
            <ProviderHeader title="Completed Bookings" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {bookings.map(booking => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        showActions={false}
                        status={booking.status}
                        statusColor={booking.statusColor}
                        statusIcon={booking.statusIcon}
                        paidBy={booking.paidBy}
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

export default CompletedBookingsScreen; 