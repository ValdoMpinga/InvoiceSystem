import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/contants';
import {API_URL} from '../utils/contants';
import ProductList from '../components/ProductList';
import {Searchbar} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomers} from '../../redux/invoiceStore';
import CustomButton from '../components/CustomButton';

const screenWidth = Dimensions.get('window').width;

const InvoiceCreationScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {customers, productQuantities} = useSelector(state => state.invoice);
  let emailsArray = [];

  const dispatch = useDispatch();

  useEffect(() => {
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
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    const fetchCustomers = async () => {
      try {
        let endpoint = API_URL + '/customer/get';
        console.log(endpoint);

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let data = await response.json();

        emailsArray = data.customers.data.map(item => item.email);

        dispatch(setCustomers(emailsArray));
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
    fetchCustomers();
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
        <SelectDropdown
          data={customers}
          search={true}
          onSelect={(selectedItem, index) => {
            setSelectedCustomer(selectedItem);
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          renderDropdownIcon={() => {}}
        />
      </View>
      <View style={styles.createButtonContainer}>
        <CustomButton
          customTextStyle={{color: Colors.black, fontSize: 18}}
          customButtonStyle={{backgroundColor: Colors.color1}}
          title={'Create'}
          onPress={() => {
            let postProducts = {
              customer_email: selectedCustomer,
              products: [],
              is_payed: true,
            };

            for (const [key, value] of Object.entries(productQuantities)) {
              postProducts.products.push({
                product_id: key,
                product_quantity: value,
              });
            }

            let endpoint = API_URL + '/invoice/create';

            fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postProducts),
            })
              .then(response => response.json())
              .then(data => {
                // Handle the response data here
                console.log(data);
              })
              .catch(error => {
                // Handle errors here
                console.error('Error:', error);
              });
          }}
        />
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
    backgroundColor: Colors.color9,
    color: Colors.black,
  },
  productListView: {
    marginTop: 30,
  },
});

export default InvoiceCreationScreen;
