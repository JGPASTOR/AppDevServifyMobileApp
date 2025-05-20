import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext';
import { API_URL } from '../Config/Config';
import HeaderProfileButton from '../Components/HeaderProfileButton';
// ... existing code ... 