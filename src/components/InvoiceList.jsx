import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { Colors } from '../utils/contants';

const InvoiceList = ({invoicesData}) => {
  useEffect(() => {
    console.log('here');
    console.log(invoicesData);
  }, [invoicesData]); // Add invoicesData as a dependency

  const renderInvoiceItem = ({item}) => {
    // Convert the emissionDate string to a JavaScript Date object
    const dateObject = new Date(item.emissionDate);

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(dateObject);

    return (
      <View style={styles.card}>
        <TouchableOpacity>
          <Text style={styles.title}>Invoice Status: {item.status}</Text>
          <Text>Emission Date: {formattedDate}</Text>
          <Text>Total Amount: {item.totalAmount}</Text>
          <Text>Customer Email: {item.customerEmail}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={invoicesData}
      keyExtractor={invoice => invoice.status.toString()}
      renderItem={renderInvoiceItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth / 1.2,
    backgroundColor: Colors.color1,
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InvoiceList;
