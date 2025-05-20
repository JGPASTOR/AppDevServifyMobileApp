import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClientHeader from '../../Components/ClientHeader';

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const settingsOptions = [
        {
            id: '1',
            title: 'Account Settings',
            icon: 'person-outline',
            onPress: () => console.log('Account Settings'),
        },
        {
            id: '2',
            title: 'Payment Methods',
            icon: 'card-outline',
            onPress: () => console.log('Payment Methods'),
        },
        {
            id: '3',
            title: 'Privacy',
            icon: 'shield-outline',
            onPress: () => console.log('Privacy'),
        },
        {
            id: '4',
            title: 'Help & Support',
            icon: 'help-circle-outline',
            onPress: () => console.log('Help & Support'),
        },
        {
            id: '5',
            title: 'About',
            icon: 'information-circle-outline',
            onPress: () => console.log('About'),
        },
    ];

    const renderSettingItem = ({ item }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={item.onPress}
        >
            <View style={styles.settingItemLeft}>
                <Ionicons name={item.icon} size={24} color="#333" />
                <Text style={styles.settingItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ClientHeader title="Settings" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <View style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                            <Text style={styles.settingItemText}>Push Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#767577', true: '#8072FF' }}
                            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                    <View style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Ionicons name="mail-outline" size={24} color="#333" />
                            <Text style={styles.settingItemText}>Email Notifications</Text>
                        </View>
                        <Switch
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            trackColor={{ false: '#767577', true: '#8072FF' }}
                            thumbColor={emailNotifications ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <View style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <Ionicons name="moon-outline" size={24} color="#333" />
                            <Text style={styles.settingItemText}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#767577', true: '#8072FF' }}
                            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>
                    {settingsOptions.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.settingItem}
                            onPress={item.onPress}
                        >
                            <View style={styles.settingItemLeft}>
                                <Ionicons name={item.icon} size={24} color="#333" />
                                <Text style={styles.settingItemText}>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#999" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        backgroundColor: 'white',
        marginTop: 16,
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginLeft: 16,
        marginBottom: 8,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingItemText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    logoutButton: {
        margin: 16,
        padding: 16,
        backgroundColor: '#ff4444',
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SettingsScreen; 