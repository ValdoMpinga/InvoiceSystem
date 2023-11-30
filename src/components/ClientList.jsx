// ClientList.js

import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const ClientList = ({ data }) =>
{
    useEffect(() =>
    {
        
    },[])
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Email: {item.email}</Text>
      <Text style={styles.cardText}>Country: {item.country}</Text>
      <Text style={styles.cardText}>City: {item.city}</Text>
      <Text style={styles.cardText}>Number of Invoices: {item.invoices}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    cardText: {
      color: "black",
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ClientList;
