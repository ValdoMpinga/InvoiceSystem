import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/contants';
import {API_URL} from '../utils/contants';
import ProductList from '../components/ProductList';
const InvoiceCreationScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = API_URL + '/product/get';
        console.log(endpoint);

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let data = await response.json();

        console.log(data.products.data);
        setProducts(data.products.data);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>InvoiceCreationScreen</Text>
      {/* Render the ProductList component with the products data */}
      <ProductList data={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color1,
  },
});

export default InvoiceCreationScreen;
