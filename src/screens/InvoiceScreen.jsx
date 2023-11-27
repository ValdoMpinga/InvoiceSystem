import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTestString, setShowCustomerModal} from '../../redux/invoiceStore';
import {Colors} from '../utils/contants';
import FloatingButton from '../components/FloatingButtons';

const InvoiceScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {testString, showCustomerModal} = useSelector(state => state.invoice);

  useEffect(() => {
    navigation.navigate('WithoutTabs', {screen: 'InvoiceCreation'});
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color5,
      }}>
      <Text>InvoiceScreen {testString} </Text>
      <FloatingButton
        iconName={'file-invoice'}
        onButtonClick={() => {
          console.log('ya');
          navigation.navigate('WithoutTabs', {screen: 'InvoiceCreation'});
        }}
      />
    </View>
  );
};

export default InvoiceScreen;
