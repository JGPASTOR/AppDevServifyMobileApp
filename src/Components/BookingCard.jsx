import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BookingCard = ({
    booking,
    onAccept,
    onDecline,
    onProceed,
    onDone,
    onConfirmPayment,
    showActions = false,
    status = 'pending',
    statusColor = '#FFA500',
    statusIcon = 'help-circle',
    paidBy = null
}) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigation = useNavigation();

    const handleViewDetails = () => {
        setIsExpanded(!isExpanded);
    };

    const renderDetailRow = (label, value, icon) => (
        <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
                <Ionicons name={icon} size={20} color="#8072FF" style={styles.icon} />
                <Text style={styles.detailLabel}>{label}</Text>
            </View>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );

    const renderBookingDetails = () => {
        if (!isExpanded) return null;

        return (
            <View style={styles.detailsSection}>
                <View style={styles.separator} />
                {renderDetailRow('Service', booking.serviceType, 'construct')}
                {renderDetailRow('Client', booking.clientName, 'person')}
                {renderDetailRow('Address', booking.address, 'location')}
                {renderDetailRow('Contact', booking.contactNumber, 'call')}
                {renderDetailRow('Date', booking.date, 'calendar')}
                {renderDetailRow('Amount', `₱${booking.amount}`, 'cash')}
            </View>
        );
    };

    const handleConfirmPayment = () => {
        Alert.alert(
            'Confirm Payment',
            'Are you sure you want to mark this booking as completed?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setCurrentStatus('completed');
                        if (onConfirmPayment) onConfirmPayment(booking.id);
                        navigation.navigate('ProviderApp', {
                            screen: 'ProviderBookings',
                            params: { screen: 'CompletedBookings' }
                        });
                    }
                }
            ]
        );
    };

    const renderActionButtons = () => {
        if (!showActions) return null;

        switch (currentStatus.toLowerCase()) {
            case 'pending':
                return (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => {
                                setCurrentStatus('ongoing');
                                if (onAccept) onAccept(booking.id);
                            }}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.declineButton]}
                            onPress={() => {
                                Alert.alert(
                                    'Decline Booking',
                                    'Are you sure you want to decline this booking?',
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        {
                                            text: 'Decline',
                                            onPress: () => {
                                                setCurrentStatus('declined');
                                                if (onDecline) onDecline(booking.id);
                                            }
                                        }
                                    ]
                                );
                            }}
                        >
                            <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 'ongoing':
                return (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.proceedButton]}
                            onPress={() => {
                                setCurrentStatus('in_progress');
                                if (onProceed) onProceed(booking.id);
                            }}
                        >
                            <Text style={styles.buttonText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 'in_progress':
                return (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.doneButton]}
                            onPress={() => {
                                setCurrentStatus('payment_pending');
                                if (onDone) onDone(booking.id);
                            }}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 'payment_pending':
                return (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmPaymentButton]}
                            onPress={handleConfirmPayment}
                        >
                            <Text style={styles.buttonText}>Confirm Payment</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, isExpanded && styles.expandedCard]}
            onPress={handleViewDetails}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Booking #{booking.id}</Text>
                        <Text style={styles.subtitle}>{booking.serviceType}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={styles.statusContainer}>
                            <Ionicons name={statusIcon} size={16} color={statusColor} style={styles.statusIcon} />
                            <Text style={[styles.status, { color: statusColor }]}>
                                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                            </Text>
                        </View>
                        <Text style={styles.amount}>₱{booking.amount}</Text>
                        {paidBy && <Text style={styles.paidBy}>Paid by {paidBy}</Text>}
                    </View>
                </View>

                {renderBookingDetails()}

                {showActions && !isExpanded && renderActionButtons()}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E5E2FF',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    expandedCard: {
        backgroundColor: '#F8F6FF',
    },
    cardContent: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusIcon: {
        marginRight: 4,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8072FF',
    },
    separator: {
        height: 1,
        backgroundColor: '#D1D1D1',
        marginVertical: 12,
    },
    detailsSection: {
        marginTop: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        gap: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    acceptButton: {
        backgroundColor: '#32CD32',
    },
    declineButton: {
        backgroundColor: '#FF0000',
    },
    proceedButton: {
        backgroundColor: '#2196F3',
    },
    doneButton: {
        backgroundColor: '#FF9800',
    },
    confirmPaymentButton: {
        backgroundColor: '#32CD32',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    paidBy: {
        fontSize: 14,
        color: '#666',
    },
});

export default BookingCard; 