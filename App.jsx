import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Provider} from 'react-redux';
import Store from './redux/store';

import {Colors} from './src/utils/contants';
import DashboardScreen from './src/screens/DashboardScreen';
import ClientScreen from './src/screens/ClientScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import ProductScreen from './src/screens/ProductScreen';
import InvoiceCreationScreen from './src/screens/InvoiceCreationScreen';
import DraftInvoiceScreen from './src/screens/DraftInvoiceScreen';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Stack for screens without tabs
const WithoutTabsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InvoiceCreation" component={InvoiceCreationScreen} />
      <Stack.Screen name="DraftInvoice" component={DraftInvoiceScreen} />
      {/* Add more screens for this stack if needed */}
    </Stack.Navigator>
  );
};

// Stack for screens with tabs
const WithTabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Invoice"
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
};

// Main App component
function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Tabs" component={WithTabsStack} />
          <Stack.Screen name="WithoutTabs" component={WithoutTabsStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
