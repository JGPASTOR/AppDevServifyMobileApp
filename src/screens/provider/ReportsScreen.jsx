import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProviderHeader from '../../Components/ProviderHeader';
import HeaderProfileButton from '../../Components/HeaderProfileButton';

const StatCard = ({ number, label }) => (
    <View style={styles.statCard}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const ReportSection = ({ title, data }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>
            {data.map((item, index) => (
                <View key={index} style={styles.reportItem}>
                    <View style={styles.reportItemHeader}>
                        <Text style={styles.reportItemTitle}>{item.title}</Text>
                        <Text style={[styles.reportItemStatus,
                        item.status === 'Completed' && styles.statusCompleted,
                        item.status === 'Pending' && styles.statusPending,
                        item.status === 'Declined' && styles.statusDeclined,
                        ]}>{item.status}</Text>
                    </View>
                    <View style={styles.reportItemDetails}>
                        <Text style={styles.reportItemText}>Client: {item.client}</Text>
                        <Text style={styles.reportItemText}>Date: {item.date}</Text>
                        <Text style={styles.reportItemPrice}>₱{item.price}</Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const ReportsScreen = () => {
    const navigation = useNavigation();

    // Sample data
    const monthlyStats = [
        { title: 'Total Bookings', value: '24', icon: 'calendar', color: '#4CAF50' },
        { title: 'Completed', value: '18', icon: 'checkmark-circle', color: '#2196F3' },
        { title: 'Declined', value: '3', icon: 'close-circle', color: '#f44336' },
        { title: 'Revenue', value: '₱15,000', icon: 'cash', color: '#FF9800' },
    ];

    const recentBookings = [
        {
            title: 'Aircon Cleaning',
            client: 'Clarence Buenaflor',
            date: '2024-03-15',
            price: '500',
            status: 'Completed'
        },
        {
            title: 'Aircon Repair',
            client: 'Clarence Buenaflor',
            date: '2024-03-16',
            price: '800',
            status: 'Pending'
        },
        {
            title: 'AC Installation',
            client: 'Clarence Buenaflor',
            date: '2024-03-14',
            price: '1,500',
            status: 'Declined'
        },
        {
            title: 'Aircon Cleaning',
            client: 'Clarence Buenaflor',
            date: '2024-03-15',
            price: '500',
            status: 'Completed'
        },
        {
            title: 'Aircon Cleaning',
            client: 'Clarence Buenaflor',
            date: '2024-03-15',
            price: '500',
            status: 'Completed'
        },
    ];

    const customerFeedback = [
        { title: 'Average Rating', value: '4.8/5.0' },
        { title: 'Total Reviews', value: '45' },
        { title: 'Positive Feedback', value: '95%' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ProviderHeader
                title="Reports"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('Notifications')}
            />
            <ScrollView style={styles.content}>
                <View style={styles.statsContainer}>
                    <StatCard number="4" label="Total Bookings" />
                    <StatCard number="2" label="Services" />
                    <StatCard number="₱2,500" label="Total Earnings" />
                    <StatCard number="4.5" label="Rating" />
                </View>

                <ReportSection
                    title="Recent Bookings"
                    data={recentBookings}
                />

                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer Feedback</Text>
                    <View style={styles.feedbackGrid}>
                        {customerFeedback.map((item, index) => (
                            <View key={index} style={styles.feedbackCard}>
                                <Text style={styles.feedbackValue}>{item.value}</Text>
                                <Text style={styles.feedbackTitle}>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
        padding: 8,
    },
    statCard: {
        backgroundColor: '#8072FF',
        borderRadius: 12,
        padding: 16,
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    sectionContent: {
        gap: 12,
    },
    reportItem: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    reportItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reportItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    reportItemStatus: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusCompleted: {
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    statusPending: {
        backgroundColor: '#FFC107',
        color: '#333',
    },
    statusDeclined: {
        backgroundColor: '#f44336',
        color: 'white',
    },
    reportItemDetails: {
        gap: 4,
    },
    reportItemText: {
        fontSize: 14,
        color: '#666',
    },
    reportItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 4,
    },
    feedbackGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    feedbackCard: {
        width: '31%',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    feedbackValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8072FF',
        marginBottom: 4,
    },
    feedbackTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default ReportsScreen; 