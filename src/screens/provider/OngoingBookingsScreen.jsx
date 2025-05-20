import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProviderHeader from '../../Components/ProviderHeader';
import BookingCard from '../../Components/BookingCard';

const OngoingBookingsScreen = () => {
    const navigation = useNavigation();
    const [bookings, setBookings] = useState([
        {
            id: '1',
            serviceType: 'Plumbing',
            clientName: 'Clarence Buenaflor',
            address: 'Surigao city, Surigao del norte',
            contactNumber: '+639123456789',
            date: '2025-04-22',
            amount: '500',
            status: 'ongoing',
            statusColor: '#2196F3',
            statusIcon: 'time',
        },
    ]);

    const handleAccept = (id) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'ongoing', statusColor: '#2196F3', statusIcon: 'time' } : booking
        ));
    };

    const handleDecline = (id) => {
        setBookings(bookings.filter(booking => booking.id !== id));
        navigation.navigate('ProviderBookings', { screen: 'DeclinedBookings' });
    };

    const handleProceed = (id) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'in_progress', statusColor: '#2196F3', statusIcon: 'time' } : booking
        ));
    };

    const handleDone = (id) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'payment_pending', statusColor: '#FF9800', statusIcon: 'cash' } : booking
        ));
    };

    const handleConfirmPayment = (id) => {
        setBookings(bookings.filter(booking => booking.id !== id));
        navigation.navigate('ProviderBookings', { screen: 'CompletedBookings' });
    };

    return (
        <View style={styles.container}>
            <ProviderHeader title="Ongoing Bookings" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {bookings.map(booking => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        showActions={true}
                        status={booking.status}
                        statusColor={booking.statusColor}
                        statusIcon={booking.statusIcon}
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                        onProceed={handleProceed}
                        onDone={handleDone}
                        onConfirmPayment={handleConfirmPayment}
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

export default OngoingBookingsScreen; 