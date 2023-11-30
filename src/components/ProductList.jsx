import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/contants';
import {setProductQuantities} from '../../redux/invoiceStore';
import {useDispatch, useSelector} from 'react-redux';

const ProductList = ({data, displayButtons}) => {
  const dispatch = useDispatch();
  const {productQuantities} = useSelector(state => state.invoice);

  useEffect(() => {
    console.log(data);
  }, []);

  const handleSubtractQuantity = item => {
    const currentQuantity = productQuantities[item.id] || 0;
    if (currentQuantity > 0) {
      dispatch(
        setProductQuantities({
          ...productQuantities,
          [item.id]: currentQuantity - 1,
        }),
      );
    }
  };

  const handleAddQuantity = item => {
    const currentQuantity = productQuantities[item.id] || 0;
    dispatch(
      setProductQuantities({
        ...productQuantities,
        [item.id]: currentQuantity + 1,
      }),
    );
  };

const renderItem = ({item, index}) => {
  const isEven = index % 2 === 0;
  const backgroundColor = isEven ? Colors.color9 : Colors.color10;

  const quantity = productQuantities[item.id] || 0;

  return (
    <View style={[styles.itemContainer, {backgroundColor}]}>
      <Image
        source={{
          uri: item.url,
        }}
        style={styles.image}
        onError={error => console.error('Image load error:', error)}
      />

      <View style={styles.textContainer}>
        <Text style={styles.productText}>{item.name}</Text>
        <Text style={styles.text}>€{item.unit_price}</Text>
      </View>
      {displayButtons && (
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleSubtractQuantity(item)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleAddQuantity(item)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'center',

    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    paddingLeft: 10,
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
