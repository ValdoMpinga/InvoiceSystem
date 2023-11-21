import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DashboardScreen from './src/screens/DashboardScreen';
import ClientScreen from './src/screens/ClientScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import ProductScreen from './src/screens/ProductScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const Tab = createMaterialBottomTabNavigator();
import { Colors } from './src/utils/contants';

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      
      activeColor={Colors.color2}
      inactiveColor={Colors.color4}
      barStyle={{backgroundColor: Colors.color1}}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Client"
        component={ClientScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6 name="people-group" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6 name="file-invoice" color={color} size={25} />
          ), 
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="package-variant"
              color={color}
              size={25}
            />
          ),
        }}
      />
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
