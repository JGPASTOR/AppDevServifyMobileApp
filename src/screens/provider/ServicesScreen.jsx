import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderHeader from '../../Components/ProviderHeader';

const ServiceCard = ({ service, onEdit, onDelete }) => (
    <View style={styles.serviceCard}>
        <View style={styles.serviceImageContainer}>
            <Image source={service.image} style={styles.serviceImage} />
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{service.status}</Text>
            </View>
        </View>
        <View style={styles.serviceContent}>
            <View style={styles.serviceHeader}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.servicePrice}>₱{service.price}</Text>
            </View>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <View style={styles.addressContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.serviceAddress}>{service.address}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => onEdit(service)}
                >
                    <Ionicons name="create-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => onDelete(service.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const ServicesScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({
        title: '',
        address: '',
        price: '',
        description: '',
        image: null,
    });

    // Sample services data
    const [services, setServices] = useState([
        {
            id: 1,
            title: 'Aircon Cleaning',
            description: 'Professional aircon cleaning and maintenance service',
            address: 'Pedro Coleto St. Barangay San Juan Surigao City',
            price: '500',
            status: 'Available',
            image: require('../../../assets/images/airconTech.png'),
        },
        {
            id: 2,
            title: 'Aircon Repair',
            description: 'Expert aircon repair and troubleshooting',
            address: 'Pedro Coleto St. Barangay San Juan Surigao City',
            price: '800',
            status: 'Available',
            image: require('../../../assets/images/airconTech.png'),
        },
    ]);

    const handleAddService = () => {
        setEditingService(null);
        setNewService({
            title: '',
            Address: '',
            price: '',
            description: '',
            image: null,
        });
        setModalVisible(true);
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setNewService({
            title: service.title,
            price: service.price,
            description: service.description,
            Address: service.Address,
            image: service.image,
        });
        setModalVisible(true);
    };

    const handleDeleteService = (serviceId) => {
        setServices(services.filter(service => service.id !== serviceId));
    };

    const handleSave = () => {
        if (editingService) {
            setServices(services.map(service =>
                service.id === editingService.id
                    ? { ...service, ...newService }
                    : service
            ));
        } else {
            setServices([
                ...services,
                {
                    id: services.length + 1,
                    ...newService,
                    status: 'Available',
                },
            ]);
        }
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProviderHeader title="Services" />

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddService}
            >
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text style={styles.addButtonText}>Add New Service</Text>
            </TouchableOpacity>

            <ScrollView style={styles.content}>
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={handleEditService}
                        onDelete={handleDeleteService}
                    />
                ))}
            </ScrollView>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.imageUpload}>
                            <Ionicons name="image-outline" size={32} color="#666" />
                            <Text style={styles.uploadText}>Choose Image</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder="Service Title"
                            value={newService.title}
                            onChangeText={(text) =>
                                setNewService({ ...newService, title: text })
                            }
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Service Description"
                            value={newService.description}
                            onChangeText={(text) =>
                                setNewService({ ...newService, description: text })
                            }
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={newService.address}
                            onChangeText={(text) =>
                                setNewService({ ...newService, address: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={newService.price}
                            onChangeText={(text) =>
                                setNewService({ ...newService, price: text })
                            }
                            keyboardType="numeric"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8072FF',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    serviceCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    serviceImageContainer: {
        position: 'relative',
    },
    serviceImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    statusBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    serviceContent: {
        padding: 16,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    servicePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8072FF',
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    editButton: {
        backgroundColor: '#8072FF',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 5,
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
    imageUpload: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadText: {
        color: '#666',
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        marginTop: 8,
    },
    modalButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#8072FF',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    serviceAddress: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
});

export default ServicesScreen; 