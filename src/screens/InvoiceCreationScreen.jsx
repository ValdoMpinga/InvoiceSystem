import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/contants';
import {API_URL} from '../utils/contants';
import ProductList from '../components/ProductList';
import {Searchbar} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomers} from '../../redux/invoiceStore';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Fontisto';
import Loading from '../components/Loading';

const screenWidth = Dimensions.get('window').width;

const InvoiceCreationScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, productQuantities } = useSelector(state => state.invoice);
  const [isDataLoading, setIsDataLoading] = useState(true);


  let emailsArray = [];

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
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
          <ProductList data={filteredProducts} displayButtons={true} />
        </View>
      </View>
      <View style={styles.customerContainer}>
        <SelectDropdown
          defaultButtonText="Select the customer"
          buttonStyle={{width: screenWidth / 1.2}}
          data={customers}
          search={true}
          onSelect={(selectedItem, index) => {
            setSelectedCustomer(selectedItem);
            console.log(selectedItem, index);
          }}
          searchPlaceHolder="Search Client"
          renderDropdownIcon={() => (
            <Icon name={'angle-down'} color={Colors.black} size={25} />
          )}
        />
      </View>
      <View style={styles.createButtonContainer}>
        <CustomButton
          customTextStyle={{color: Colors.black, fontSize: 18}}
          customButtonStyle={{backgroundColor: Colors.color3}}
          title={'Create'}
          onPress={async () => {
            let postProducts = {
              customer_email: selectedCustomer,
              products: [],
              is_payed: true,
            };

            console.log('quantities: ', productQuantities);
            console.log('selected customer: ', selectedCustomer);
            if (productQuantities == {} || selectedCustomer == null) {
              Alert.alert(
                'Oops!',
                'Please select a customer and add some products.',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            } else {
              for (const [key, value] of Object.entries(productQuantities)) {
                postProducts.products.push({
                  product_id: key,
                  product_quantity: value,
                });
              }

              let endpoint = API_URL + '/invoice/create';

              const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postProducts),
              });

              if (!response.ok) {
                console.log('some error occured');
                throw new Error('Failed to retrieve draft invoice');
              }

              const responseData = await response.json();
              const insertedInvoiceId = responseData.inserted_invoice_id;

              console.log(insertedInvoiceId);

              navigation.navigate('WithoutTabs', {
                screen: 'InvoiceView',
                params: {
                  insertedInvoiceId: insertedInvoiceId,
                },
              });
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color10,
  },
  productContainer: {
    flex: 1,
  },
  customerContainer: {
    flex: 0.3,
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBarView: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: 'grey',
    width: screenWidth / 1.25,
    color: Colors.black,
  },
  productListView: {
    marginTop: 30,
  },
});

export default InvoiceCreationScreen;
