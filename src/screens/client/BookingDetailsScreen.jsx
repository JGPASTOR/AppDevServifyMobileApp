import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookingDetailsScreen = ({ route, navigation }) => {
    const { booking } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.content}>
                {booking ? (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>Service: {booking.service}</Text>
                        <Text style={styles.title}>Provider: {booking.providerName}</Text>
                        <Text style={styles.text}>Date: {booking.date}</Text>
                        <Text style={styles.text}>Address: {booking.address}</Text>
                        <Text style={styles.text}>Status: {booking.status}</Text>
                        <Text style={styles.text}>Price: {booking.price}</Text>
                        <Text style={styles.text}>Paid by: {booking.paidby}</Text>
                    </View>
                ) : (
                    <Text style={styles.noData}>No booking details available</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E2FF',
        marginTop: 30,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '',
        marginLeft: 16,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    detailsContainer: {
        backgroundColor: '#E5E2FF',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    noData: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});

export default BookingDetailsScreen; 