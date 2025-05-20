import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';

// Client Screens
import HomeScreen from "./src/screens/client/HomeScreen";
import BookingsScreen from "./src/screens/client/BookingsScreen";
import ProfileScreen from "./src/screens/client/ProfileScreen";
import ClientLoginScreen from "./src/screens/auth/ClientLoginScreen";
import ClientRegisterScreen from "./src/screens/auth/ClientRegisterScreen";
import BookingDetailsScreen from "./src/screens/client/BookingDetailsScreen";
import CreateBookingScreen from "./src/screens/client/CreateBookingScreen";
import AllServiceCategoriesScreen from "./src/screens/client/AllServiceCategoriesScreen";
import AllServiceProvidersScreen from "./src/screens/client/AllServiceProvidersScreen";
import ClientNotificationsScreen from "./src/screens/client/NotificationsScreen";
import ClientSettingsScreen from "./src/screens/client/SettingsScreen";

// Provider Screens
import ServiceProviderDashboard from "./src/screens/provider/ServiceProviderDashboard";
import ServicesScreen from "./src/screens/provider/ServicesScreen";
import ReportsScreen from "./src/screens/provider/ReportsScreen";
import ProviderLoginScreen from "./src/screens/auth/ProviderLoginScreen";
import ServiceProviderProfile from "./src/screens/provider/ServiceProviderProfile";
import NotificationsScreen from "./src/screens/provider/NotificationsScreen";
import NewBookingsScreen from "./src/screens/provider/NewBookingsScreen";
import OngoingBookingsScreen from "./src/screens/provider/OngoingBookingsScreen";
import CompletedBookingsScreen from "./src/screens/provider/CompletedBookingsScreen";
import DeclinedBookingsScreen from "./src/screens/provider/DeclinedBookingsScreen";
import ProviderServicesScreen from './src/screens/provider/ServicesScreen';
import ProviderNotificationsScreen from './src/screens/provider/NotificationsScreen';

// Components
import Sidebar from './src/Components/Sidebar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Provider Services Stack Navigator
const ProviderServicesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServicesList" component={ServicesScreen} />
    </Stack.Navigator>
  );
};

// Provider Booking Stack Navigator
const ProviderBookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewBookings" component={NewBookingsScreen} />
      <Stack.Screen name="OngoingBookings" component={OngoingBookingsScreen} />
      <Stack.Screen name="CompletedBookings" component={CompletedBookingsScreen} />
      <Stack.Screen name="DeclinedBookings" component={DeclinedBookingsScreen} />
    </Stack.Navigator>
  );
};

// Provider Drawer Navigator
const ProviderDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#8072FF',
          width: '75%',
        },
        drawerType: 'front',
        drawerPosition: 'left',
        drawerStatusBarAnimation: 'slide',
        swipeEnabled: true,
        gestureEnabled: true,
      }}
      initialRouteName="ServiceProviderDashboard"
    >
      <Drawer.Screen
        name="ServiceProviderDashboard"
        component={ServiceProviderDashboard}
        options={{
          drawerLabel: 'Dashboard',
          drawerLabelStyle: { color: 'white' }
        }}
      />
      <Drawer.Screen
        name="ServicesScreen"
        component={ProviderServicesStack}
        options={{
          drawerLabel: 'Services',
          drawerLabelStyle: { color: 'white' }
        }}
      />
      <Drawer.Screen
        name="ProviderBookings"
        component={ProviderBookingStack}
        options={{
          drawerLabel: 'Bookings',
          drawerLabelStyle: { color: 'white' }
        }}
      />
      <Drawer.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{
          drawerLabel: 'Reports',
          drawerLabelStyle: { color: 'white' }
        }}
      />
      <Drawer.Screen
        name="ServiceProviderProfile"
        component={ServiceProviderProfile}
        options={{
          drawerLabel: 'Profile',
          drawerLabelStyle: { color: 'white' }
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: 'Notifications',
          drawerLabelStyle: { color: 'white' }
        }}
      />
    </Drawer.Navigator>
  );
};

// Client Tab Navigator
function ClientAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={AllServiceCategoriesScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Client Stack Navigator
const ClientStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={ClientAppTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AllServiceCategories"
      component={AllServiceCategoriesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AllServiceProviders"
      component={AllServiceProvidersScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="CreateBooking" component={CreateBookingScreen} />
    <Stack.Screen name="Notifications" component={ClientNotificationsScreen} />
    <Stack.Screen name="Settings" component={ClientSettingsScreen} />
    <Stack.Screen name="ServiceDetails" component={ClientServiceDetailsScreen} />
    <Stack.Screen name="Payment" component={ClientPaymentScreen} />
    <Stack.Screen name="Chat" component={ClientChatScreen} />
    <Stack.Screen name="Reviews" component={ClientReviewsScreen} />
  </Stack.Navigator>
);

// Provider Tab Navigator
function ProviderAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ProviderHomeScreen} />
      <Tab.Screen name="Services" component={ProviderServicesScreen} />
      <Tab.Screen name="Bookings" component={ProviderBookingsScreen} />
      <Tab.Screen name="Profile" component={ProviderProfileScreen} />
    </Tab.Navigator>
  );
}

// Provider Stack Navigator
const ProviderStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProviderMain" component={ProviderAppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="ServiceDetails" component={ProviderServiceDetailsScreen} />
    <Stack.Screen name="BookingDetails" component={ProviderBookingDetailsScreen} />
    <Stack.Screen name="Earnings" component={ProviderEarningsScreen} />
    <Stack.Screen name="Chat" component={ProviderChatScreen} />
    <Stack.Screen name="Reviews" component={ProviderReviewsScreen} />
    <Stack.Screen name="Notifications" component={ProviderNotificationsScreen} />
    <Stack.Screen name="Settings" component={ProviderSettingsScreen} />
  </Stack.Navigator>
);

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={ClientLoginScreen} />
    <Stack.Screen name="Register" component={ClientRegisterScreen} />
  </Stack.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Client" component={ClientStack} />
        <Stack.Screen name="Provider" component={ProviderStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
