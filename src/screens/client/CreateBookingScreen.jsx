import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


const CreateBookingScreen = ({ route, navigation }) => {
    const { provider } = route.params || {};
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const formatTime = (time) => {
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleCreateBooking = () => {
        const missingFields = [];
        if (!date) missingFields.push('Date');
        if (!time) missingFields.push('Time');
        if (!contactNumber) missingFields.push('Contact Number');
        if (!address) missingFields.push('Address');

        if (missingFields.length > 0) {
            Alert.alert(
                'Error',
                `Please fill in the following fields:\n${missingFields.join('\n')}`,
                [{ text: 'OK' }]
            );
            return;
        }

        // Create booking object
        const newBooking = {
            id: Date.now().toString(),
            providerName: provider.name,
            service: provider.services[0],
            date: formatDate(date),
            time: formatTime(time),
            contactNumber: contactNumber,
            status: 'Pending',
            address: address,
        };

        // Here you would typically send this to your backend
        console.log('Creating booking:', newBooking);

        // Show success message
        Alert.alert(
            'Success',
            'Booking created successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Bookings')
                }
            ]
        );
    };

    if (!provider) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Error</Text>
                </View>
                <View style={styles.content}>
                    <Text>No provider information available</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.content}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Service Provider</Text>
                    <View style={styles.providerContainer}>
                        <Text style={styles.providerText}>{provider.name}</Text>
                    </View>
                    <Text style={styles.label}>Service Type</Text>
                    <View style={styles.serviceContainer}>
                        <Text style={styles.serviceText}>{provider.services[0]}</Text>
                    </View>
                    


                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                        style={styles.dateTimeButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Ionicons name="calendar" size={24} color="#8072FF" />
                        <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            minimumDate={new Date()}
                        />
                    )}

                    <Text style={styles.label}>Time</Text>
                    <TouchableOpacity
                        style={styles.dateTimeButton}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Ionicons name="time" size={24} color="#8072FF" />
                        <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}

                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        placeholder="Enter contact number"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter address"
                        multiline={true}
                    />

                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleCreateBooking}
                    >
                        <Text style={styles.buttonText}>Book Service Now</Text>
                    </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginTop: 30,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    providerContainer: {
        backgroundColor: '#E5E2FF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    providerText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    serviceContainer: {
        backgroundColor: '#E5E2FF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    serviceText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    dateTimeText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    createButton: {
        backgroundColor: '#8072FF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateBookingScreen; 