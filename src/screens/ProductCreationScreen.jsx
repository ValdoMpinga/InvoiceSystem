import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from '../utils/contants';
import CustomButton from '../components/CustomButton';
import {API_URL} from '../utils/contants';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../../redux/invoiceStore';

const ProductCreationScreen = ({navigation}) => {
  const [productName, setProductName] = useState('Paw Paw');
  const [productCost, setProductCost] = useState(0.99);
  const [productUrl, setProductUrl] = useState(
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.xRYpNCL-903rjURIuxRVUQHaEL%26pid%3DApi&f=1&ipt=1b220dfe84bca43e8b7e6e9e82b77d21d8768c50c4eca6fd7c12081f2ccce276&ipo=images',
  );
  const [productDescription, setProductDescription] = useState('Fruit');

  const {products} = useSelector(state => state.invoice);

  const dispatch = useDispatch();

  const handleCreateProduct = async () => {
    if (!productName || !productCost || !productUrl || !productDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    let postProductObject = {
      name: productName,
      description: productDescription,
      unit_price: productCost,
      url: productUrl,
    };

    await postProducts(postProductObject);
  };

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
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  const postProducts = async postProducts => {
    let endpoint = API_URL + '/product/create';

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
    await fetchProducts();

    Alert.alert('Success', 'Product inserted successfully!', [
      {
        text: 'OK',
        onPress: async () => {

          navigation.navigate('Tabs', {
            screen: 'Product',
          });
        },
      },
    ]);
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Creation Screen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Product Name"
          value={productName}
          onChangeText={text => setProductName(text)}
          mode="flat"
          style={styles.textInput}
        />

        <TextInput
          label="Product Cost"
          value={productCost}
          onChangeText={text => setProductCost(text)}
          mode="flat"
          keyboardType="numeric"
          style={styles.textInput}
        />

        <TextInput
          label="Product URL"
          value={productUrl}
          onChangeText={text => setProductUrl(text)}
          mode="flat"
          multiline
          numberOfLines={4}
          style={styles.textInput}
        />

        <TextInput
          label="Product Description"
          value={productDescription}
          onChangeText={text => setProductDescription(text)}
          mode="flat"
          multiline
          numberOfLines={2}
          style={styles.textInput}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={async () => {
            await handleCreateProduct();
          }}
          customTextStyle={{color: Colors.black, fontSize: 18}}
          customButtonStyle={{backgroundColor: Colors.color3}}
          title="Create"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.color1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  textInput: {
    marginTop: 35,
  },
  buttonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginTop: 'auto', // Push the button to the bottom
    marginBottom: 50,
  },
});

export default ProductCreationScreen;
