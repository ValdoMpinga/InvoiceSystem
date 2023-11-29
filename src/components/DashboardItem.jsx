import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const DashboardItem = ({title, number, iconName, iconColor, color}) => {
    return (
      <TouchableOpacity>
        <View style={[styles.container, {backgroundColor: color}]}>
          <Icon name={iconName} size={40} color={iconColor} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.number}>{number}</Text>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    // padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    marginTop: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DashboardItem;
