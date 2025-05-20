import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = () => {
    const navigation = useNavigation();
    const [isBookingsExpanded, setIsBookingsExpanded] = useState(false);

    const menuItems = [
        {
            id: '1',
            title: 'Dashboard',
            icon: 'home-outline',
            onPress: () => navigation.navigate('ProviderApp', { screen: 'ServiceProviderDashboard' }),
        },
        {
            id: '2',
            title: 'Services',
            icon: 'construct-outline',
            onPress: () => navigation.navigate('ProviderApp', { screen: 'ServicesScreen' }),
        },
        {
            id: '3',
            title: 'Bookings',
            icon: 'calendar-outline',
            onPress: () => setIsBookingsExpanded(!isBookingsExpanded),
            subItems: [
                {
                    id: '3.1',
                    title: 'New Bookings',
                    onPress: () => navigation.navigate('ProviderApp', { screen: 'ProviderBookings', params: { screen: 'NewBookings' } }),
                },
                {
                    id: '3.2',
                    title: 'Ongoing',
                    onPress: () => navigation.navigate('ProviderApp', { screen: 'ProviderBookings', params: { screen: 'Ongoing' } }),
                },
                {
                    id: '3.3',
                    title: 'Completed',
                    onPress: () => navigation.navigate('ProviderApp', { screen: 'ProviderBookings', params: { screen: 'Completed' } }),
                },
                {
                    id: '3.4',
                    title: 'Declined',
                    onPress: () => navigation.navigate('ProviderApp', { screen: 'ProviderBookings', params: { screen: 'Declined' } }),
                },
            ],
        },
        {
            id: '4',
            title: 'Reports',
            icon: 'bar-chart-outline',
            onPress: () => navigation.navigate('ProviderApp', { screen: 'ReportsScreen' }),
        },
    ];

    const handleLogout = () => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm('Are you sure you want to logout?');
            if (confirmed) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ProviderLogin' }],
                });
            }
        } else {
            Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Logout',
                        style: 'destructive',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'ProviderLogin' }],
                            });
                        },
                    },
                ],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/LOGO.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={item.onPress}
                        >
                            <Ionicons name={item.icon} size={24} color="#BEBEBE" style={styles.menuIcon} />
                            <Text style={styles.menuText}>{item.title}</Text>
                            {item.subItems && (
                                <Ionicons
                                    name={isBookingsExpanded ? 'chevron-up' : 'chevron-down'}
                                    size={20}
                                    color="#BEBEBE"
                                    style={styles.chevron}
                                />
                            )}
                        </TouchableOpacity>

                        {item.subItems && isBookingsExpanded && (
                            <View style={styles.subMenu}>
                                {item.subItems.map((subItem, subIndex) => (
                                    <TouchableOpacity
                                        key={subIndex}
                                        style={styles.subMenuItem}
                                        onPress={subItem.onPress}
                                    >
                                        <Text style={styles.subMenuText}>{subItem.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.profileSection}>
                <TouchableOpacity
                    style={styles.profileItem}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color="#BEBEBE" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8072FF',
        paddingTop: 20,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    logo: {
        width: 130,
        height: 120,
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    menuContainer: {
        flex: 1,
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    menuIcon: {
        color: '#BEBEBE',
        marginRight: 15,
    },
    menuText: {
        color: '#BEBEBE',
        fontSize: 16,
        flex: 1,
    },
    chevron: {
        marginLeft: 'auto',
    },
    subMenu: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    subMenuItem: {
        padding: 12,
        paddingLeft: 54,
    },
    subMenuText: {
        color: 'white',
        fontSize: 14,
    },
    profileSection: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export default Sidebar; 