import {View, Text} from 'react-native';
import React from 'react';
import { PacmanIndicator } from 'react-native-indicators';

const Loading = ({color}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {/* <Text
          style={{
            color: Colors.black,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Loading...
        </Text> */}
        <PacmanIndicator size={100} color={color} />
      </View>
    </View>
  );
};

export default Loading;
