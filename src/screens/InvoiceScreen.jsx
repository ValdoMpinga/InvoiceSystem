import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import InvoiceList from '../components/InvoiceList';
import {API_URL} from '../utils/contants';
import {Colors} from '../utils/contants';
import Loading from '../components/Loading';
import FloatingButton from '../components/FloatingButtons';

const InvoiceScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isInvoicesLoading, setIsInvoicesLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
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

      const invoicesArray = await Promise.all(
        data.invoices.map(async invoice => {
          const customerResponse = await fetch(
            `${API_URL}/customer/get-by-id`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({customer_id: invoice.customer_id}),
            },
          );

          console.log("bellow invoice data");
          console.log(invoice);
          const customerObj = await customerResponse.json();

          return {
            id: invoice.id,
            status: 'Paid',
            emissionDate: invoice.emission_data,
            totalAmount: invoice.total_amount,
            customerEmail: customerObj.customer.email,
          };
        }),
      );

      setInvoices(invoicesArray);
      setIsInvoicesLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      // Handle error, maybe set an error state
    }
  };

  const handleSearch = query => {
    const filtered = invoices.filter(invoice =>
      invoice.customerEmail.toLowerCase().startsWith(query.toLowerCase()),
    );
    setFilteredInvoices(filtered);
  };

  return (
    <>
      {isInvoicesLoading ? (
        <View style={{flex: 1, padding: 16, backgroundColor: Colors.color5}}>
          <Loading color={Colors.color1} />
        </View>
      ) : (
        <View style={{flex: 1, padding: 16, backgroundColor: Colors.color5}}>
          <Searchbar
            style={{backgroundColor: 'grey'}}
            placeholder="Search"
            onChangeText={query => {
              setSearchQuery(query);
              handleSearch(query); // Call handleSearch directly while typing
            }}
            value={searchQuery}
          />

          <InvoiceList
            invoicesData={searchQuery.length > 0 ? filteredInvoices : invoices}
            navigation={navigation}
          />
          <FloatingButton
            iconName={'file-invoice'}
            onButtonClick={() => {
              console.log('ya');
              navigation.navigate('WithoutTabs', {screen: 'InvoiceCreation'});
            }}
          />
        </View>
      )}
    </>
  );
};

export default InvoiceScreen;
