import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/contants';
import {API_URL} from '../utils/contants';
import ProductList from '../components/ProductList';
import {Searchbar} from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const InvoiceCreationScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        setFilteredProducts(data.products.data);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = query => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.searchBarView}>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.productListView}>
          <ProductList data={filteredProducts} />
        </View>
      </View>
      <View style={styles.customerContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color1,
  },
  productContainer: {
    flex: 1,

    backgroundColor: 'red',
  },
  customerContainer: {
    flex: 1,
    backgroundColor: 'green',
  },

  searchBarView: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchBar: {
    width: screenWidth / 1.25,
    backgroundColor: Colors.color9,
    color: Colors.black,
  },
  productListView: {
    marginTop: 30,
  },
});

export default InvoiceCreationScreen;
