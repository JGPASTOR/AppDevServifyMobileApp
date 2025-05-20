import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BookingCard from "../../Components/BookingCard";

const Tab = createMaterialTopTabNavigator();

const pendingBookings = [
    {
        id: '01',
        serviceType: 'Aircon Cleaning',
        clientName: 'Jester Pastor',
        address: 'Brgy. San Juan Surigao City',
        contactNumber: '09406135125',
        date: '2025-03-27',
        amount: '500',
        status: 'ongoing'
    },
    {
        id: '02',
        serviceType: 'Aircon Cleaning',
        clientName: 'Jester Pastor',
        address: 'Brgy. San Juan Surigao City',
        contactNumber: '09406135125',
        date: '2025-03-27',
        amount: '500',
        status: 'confirmed'
    },
    {
        id: '03',
        serviceType: 'Aircon Cleaning',
        clientName: 'Jester Pastor',
        address: 'Brgy. San Juan Surigao City',
        contactNumber: '09406135125',
        date: '2025-03-27',
        amount: '500',
        status: 'pending'
    },
];

const completedBookings = [
    {
        id: '04',
        serviceType: 'Aircon Cleaning',
        clientName: 'Jester Pastor',
        address: 'Brgy. San Juan Surigao City',
        contactNumber: '09406135125',
        date: '2025-03-27',
        amount: '500',
        status: 'completed',
        paymentMethod: 'Cash'
    },
];

const declinedBookings = [
    {
        id: '05',
        serviceType: 'Aircon Cleaning',
        clientName: 'Sarah Johnson',
        address: 'Brgy. San Juan Surigao City',
        contactNumber: '09406135125',
        date: '2025-03-27',
        amount: '500',
        status: 'declined'
    },
];

// Helper function to get status color
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
            return '#4CAF50';
        case 'pending':
            return '#FFC107';
        case 'declined':
            return '#F44336';
        case 'completed':
            return '#4CAF50';
        case 'ongoing':
            return '#2196F3';
        default:
            return '#666';
    }
};


const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
            return 'checkmark-circle';
        case 'pending':
            return 'time';
        case 'declined':
            return 'close-circle';
        case 'completed':
            return 'checkmark-done-circle';
        case 'ongoing':
            return 'play-circle';
        default:
            return 'help-circle';
    }
};

const UpcomingBookings = () => {
    return (
        <ScrollView style={styles.container}>
            {pendingBookings.length > 0 ? (
                pendingBookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        status={booking.status}
                        statusColor={getStatusColor(booking.status)}
                        statusIcon={getStatusIcon(booking.status)}
                        showActions={false}
                    />
                ))
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No pending bookings found</Text>
                </View>
            )}
        </ScrollView>
    );
};

const CompletedBookings = () => {
    return (
        <ScrollView style={styles.container}>
            {completedBookings.length > 0 ? (
                completedBookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        status={booking.status}
                        statusColor={getStatusColor(booking.status)}
                        statusIcon={getStatusIcon(booking.status)}
                        paidBy={booking.paymentMethod}
                        showActions={false}
                    />
                ))
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No completed bookings found</Text>
                </View>
            )}
        </ScrollView>
    );
};

const DeclinedBookings = () => {
    return (
        <ScrollView style={styles.container}>
            {declinedBookings.length > 0 ? (
                declinedBookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        status={booking.status}
                        statusColor={getStatusColor(booking.status)}
                        statusIcon={getStatusIcon(booking.status)}
                        showActions={false}
                    />
                ))
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No declined bookings found</Text>
                </View>
            )}
        </ScrollView>
    );
};

const BookingsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: {
                            fontSize: 14,
                            fontWeight: 'bold',
                        },
                        tabBarStyle: {
                            backgroundColor: 'white',
                            elevation: 0,
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: '#8072FF',
                            height: 3,
                        },
                    }}
                >
                    <Tab.Screen name="Pending/Ongoing" component={UpcomingBookings} />
                    <Tab.Screen name="Completed" component={CompletedBookings} />
                    <Tab.Screen name="Declined" component={DeclinedBookings} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        marginTop: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
});

export default BookingsScreen; 