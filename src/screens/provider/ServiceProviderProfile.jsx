import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderHeader from '../../Components/ProviderHeader';
import { useNavigation } from '@react-navigation/native';

const ServiceProviderProfile = () => {
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Jester Pastor',
        businessName: 'JGP AC Services',
        email: 'jpastor1@ssct.edu.ph',
        phone: '+63 9460135125',
        address: 'Pedro Coleto St. Barangay San Juan Surigao City',
        specialization: 'Air Conditioning Services Plumbing Services',
        experience: '2 years',
        rating: '3.8'
    });

    const [editedProfile, setEditedProfile] = useState({ ...profile });

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleLogout = () => {
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
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProviderHeader
                title="Profile"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('Notifications')}
            />
            <ScrollView style={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require('../../../assets/images/ProviderProfile.jpg')}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Ionicons name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.businessName}>{profile.businessName}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Text style={styles.rating}>{profile.rating}</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Business Information</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setIsEditing(true)}
                        >
                            <Ionicons name="create-outline" size={20} color="#8072FF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoCard}>
                        <InfoItem
                            icon="mail-outline"
                            label="Email"
                            value={profile.email}
                        />
                        <InfoItem
                            icon="call-outline"
                            label="Phone"
                            value={profile.phone}
                        />
                        <InfoItem
                            icon="location-outline"
                            label="Address"
                            value={profile.address}
                        />
                        <InfoItem
                            icon="construct-outline"
                            label="Specialization"
                            value={profile.specialization}
                        />
                        <InfoItem
                            icon="time-outline"
                            label="Experience"
                            value={profile.experience}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={isEditing}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Edit Profile</Text>
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScroll}>
                            <EditField
                                label="Full Name"
                                value={editedProfile.name}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, name: text })
                                }
                            />
                            <EditField
                                label="Business Name"
                                value={editedProfile.businessName}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, businessName: text })
                                }
                            />
                            <EditField
                                label="Email"
                                value={editedProfile.email}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, email: text })
                                }
                            />
                            <EditField
                                label="Phone"
                                value={editedProfile.phone}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, phone: text })
                                }
                            />
                            <EditField
                                label="Address"
                                value={editedProfile.address}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, address: text })
                                }
                            />
                            <EditField
                                label="Specialization"
                                value={editedProfile.specialization}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, specialization: text })
                                }
                            />
                            <EditField
                                label="Experience"
                                value={editedProfile.experience}
                                onChangeText={(text) =>
                                    setEditedProfile({ ...editedProfile, experience: text })
                                }
                            />
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
            <Ionicons name={icon} size={24} color="#8072FF" />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const EditField = ({ label, value, onChangeText }) => (
    <View style={styles.editField}>
        <Text style={styles.editLabel}>{label}</Text>
        <TextInput
            style={styles.editInput}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    cameraButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#8072FF',
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    businessName: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 4,
    },
    totalServices: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    infoSection: {
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 12,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalScroll: {
        maxHeight: '70%',
    },
    editField: {
        marginBottom: 16,
    },
    editLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#8072FF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        elevation: 2,
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    editButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
});

export default ServiceProviderProfile; 