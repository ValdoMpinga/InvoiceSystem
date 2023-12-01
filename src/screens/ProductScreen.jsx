import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductList from '../components/ProductList';
import {API_URL} from '../utils/contants';
import {Colors} from '../utils/contants';
import {Searchbar} from 'react-native-paper';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButtons';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../../redux/invoiceStore';

const screenWidth = Dimensions.get('window').width;

const ProductScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {products, productQuantities} = useSelector(state => state.invoice);

  const dispatch = useDispatch();

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

      dispatch(setProducts(data.products.data));
      setFilteredProducts(data.products.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  const handleSearch = query => {
    console.log('Original products:', products);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    console.log('Filtered products:', filtered);
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
              <ProductList data={products} displayButtons={true} />
            </View>
            <FloatingButton
              iconName={'plus'}
              onButtonClick={() => {
                navigation.navigate('WithoutTabs', {
                  screen: 'ProductCreation',
                  params: {
                    navigation: navigation,
                  },
                });
              }}
            />
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
    flex: 0.90,
  },
  customerContainer: {
    flex: 0.90,
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
    backgroundColor: 'grey',
    color: Colors.black,
  },
  productListView: {
    marginTop: 30,
  },
});

export default ProductScreen;
