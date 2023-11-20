// Import necessary components from 'react-native'
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './src/screens/DashboardScreen';
import ClientScreen from './src/screens/ClientScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import ProductScreen from './src/screens/ProductScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Client" component={ClientScreen} />
      <Tab.Screen name="Invoice" component={InvoiceScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
    </Tab.Navigator>
  );
}

// Main App component
function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
