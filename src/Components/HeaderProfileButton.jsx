import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderProfileButton = ({ onPress }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('ServiceProviderProfile');
        }
    };

    return (
        <TouchableOpacity
            style={styles.profileButton}
            onPress={handlePress}
        >
            <Image
                source={require('../../assets/images/ProviderProfile.jpg')}
                style={styles.profileImage}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    profileButton: {
        padding: 4,
        marginRight: -4,
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#8072FF',
    },
});

export default HeaderProfileButton; 