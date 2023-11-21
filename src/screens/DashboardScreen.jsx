import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../utils/contants';
const DashboardScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.color5}}>
      <Text>DashboardScreen</Text>
    </View>
  );
}

export default DashboardScreen
