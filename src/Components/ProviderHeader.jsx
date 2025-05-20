import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeaderProfileButton from './HeaderProfileButton';
import NotificationIcon from './NotificationIcon';

const ProviderHeader = ({ title, onMenuPress, onNotificationPress }) => {
    const navigation = useNavigation();

    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            navigation.openDrawer();
        }
    };

    const handleNotificationPress = () => {
        if (onNotificationPress) {
            onNotificationPress();
        } else {
            navigation.navigate('Notifications');
        }
    };

    const handleProfilePress = () => {
        navigation.navigate('ServiceProviderProfile');
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={handleMenuPress}
            >
                <Ionicons name="menu-outline" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.rightIcons}>
                <NotificationIcon onPress={handleNotificationPress} />
                <HeaderProfileButton onPress={handleProfilePress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ProviderHeader; 