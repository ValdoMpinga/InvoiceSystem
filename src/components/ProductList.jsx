import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/contants';

const ProductList = ({data}) => {
  useEffect(() => {
    console.log(data);
  });

  const handleSubtractQuantity = item => {
    // Your logic for subtracting quantity
    // Ensure the quantity doesn't go below 0
    const updatedQuantity = Math.max(0, item.quantity - 1);
    // Perform your logic with the updated quantity
    console.log(`Subtracting quantity for ${item.name}: ${updatedQuantity}`);
  };

  const handleAddQuantity = item => {
    // Your logic for adding quantity
    // Perform your logic with the updated quantity
    console.log(`Adding quantity for ${item.name}: ${item.quantity + 1}`);
  };

  const renderItem = ({item, index}) => {
    const isEven = index % 2 === 0;
    const backgroundColor = isEven ? Colors.color9 : Colors.color10;

    return (
      <View style={[styles.itemContainer, {backgroundColor}]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productText}>{item.name}</Text>
          <Text style={styles.text}>€{item.unit_price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleSubtractQuantity(item)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>0</Text>
          <TouchableOpacity onPress={() => handleAddQuantity(item)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16, // Increased font size
  },
  text: {
    color: Colors.black,
    fontSize: 14, // Increased font size
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20, // Increased font size for +/- buttons
    color: Colors.black, // Add your preferred color
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 18, // Increased font size for quantity value
    marginHorizontal: 10, // Added margin for better spacing
    color: Colors.black, // Add your preferred color
  },
});

export default ProductList;
