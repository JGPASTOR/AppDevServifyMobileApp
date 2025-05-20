import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationIcon = ({ onPress }) => {
    const navigation = useNavigation();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // This would typically fetch from your backend
        const fetchUnreadCount = () => {
            // Replace this with actual API call
            const mockUnreadCount = 2; // This would come from your backend
            setUnreadCount(mockUnreadCount);
        };

        fetchUnreadCount();
    }, []);

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('Notifications');
        }
    };

    return (
        <TouchableOpacity
            style={styles.notificationButton}
            onPress={handlePress}
        >
            <Ionicons name="notifications-outline" size={24} color="#333" />
            {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.badgeText}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    notificationButton: {
        padding: 8,
        marginRight: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default NotificationIcon; 