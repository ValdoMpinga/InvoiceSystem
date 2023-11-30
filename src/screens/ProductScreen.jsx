import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductList from '../components/ProductList';
import {API_URL} from '../utils/contants';
import {Colors} from '../utils/contants';
import {Searchbar} from 'react-native-paper';
import Loading from '../components/Loading';

const screenWidth = Dimensions.get('window').width;

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let endpoint = API_URL + '/product/get';

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await response.json();

      setProducts(data.products.data);
      setFilteredProducts(data.products.data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  const handleSearch = query => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setSearchQuery(query);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loading color={Colors.color1} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.productContainer}>
            <View style={styles.searchBarView}>
              <Searchbar
              style={styles.searchBar}
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
              />
            </View>
            <View style={styles.productListView}>
              <ProductList data={filteredProducts} displayButtons={false} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color8,
  },
  productContainer: {
    flex: 1,
  },
  customerContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBarView: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchBar: {
    width: screenWidth / 1.25,
    backgroundColor: "grey",
    color: Colors.black,
  },
  productListView: {
    marginTop: 30,
  },
});

export default ProductScreen;
