import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react'
import { Colors } from '../utils/contants';

const Loading = ({color}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: color,
      }}>
      <Text style={{color: Colors.black, fontWeight: 'bold', fontSize: 20, marginBottom:10}}>
        Loading...
      </Text>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

export default Loading
