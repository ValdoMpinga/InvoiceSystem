import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTestString, setShowCustomerModal} from '../../redux/invoiceStore';
import {Colors} from '../utils/contants';
import FloatingButton from '../components/FloatingButtons';
import InvoiceList from '../components/InvoiceList';
import {API_URL} from '../utils/contants';

const InvoiceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [invoices, setInvoices] = useState([]);

  const {testString} = useSelector(state => state.invoice);

  useEffect(() => {
    fetchInvoices();
  }, []);

const fetchInvoices = async () => {
  try
  {
    const response = await fetch(`${API_URL}/invoice/get-invoice-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch invoices');
      return;
    }

    const data = await response.json();

    // Use Promise.all to wait for all asynchronous operations to complete
    const invoicesArray = await Promise.all(
      data.invoices.map(async invoice => {
        const customerResponse = await fetch(`${API_URL}/customer/get-by-id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({customer_id: invoice.customer_id}),
        });

        const customerObj = await customerResponse.json();

        return {
          status: 'Paid',
          emissionDate: invoice.emission_data,
          totalAmount: invoice.total_amount,
          customerEmail: customerObj.customer.email,
        };
      }),
    );

    // Log the content of invoicesArray
    console.log('Invoices Array:', invoicesArray);

    // Set the state with the new invoicesArray
    setInvoices(invoicesArray);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    // Handle error, maybe set an error state
  }
};



  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color5,
      }}>
      <InvoiceList invoicesData={invoices} />
      <FloatingButton
        iconName={'file-invoice'}
        onButtonClick={() => {
          navigation.navigate('WithoutTabs', {screen: 'InvoiceCreation'});
        }}
      />
    </View>
  );
};

export default InvoiceScreen;
