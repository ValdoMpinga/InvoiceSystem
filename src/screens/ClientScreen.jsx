// ClientScreen.js

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ClientList from '../components/ClientList';
import {API_URL} from '../utils/contants';
import {Colors} from '../utils/contants';
import Loading from '../components/Loading';

const ClientScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isCustomersLoading, setIsCustomersLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      let endpoint = API_URL + '/customer/get';

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let customerData = await response.json();

      const customerArray = await Promise.all(
        customerData.customers.data.map(async customer => {
          const numberOfCustomerInvoices = await fetch(
            `${API_URL}/invoice/get-user-invoice-number`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({customer_id: customer.id}),
            },
          );

          const customerInvoices = await numberOfCustomerInvoices.json();

          return {
            id: customer.id,
            email: customer.email,
            country: customer.country,
            city: customer.city,
            invoices: customerInvoices.number_of_invoices,
          };
        }),
      );

      setCustomers(customerArray);
      setIsCustomersLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  const handleSearch = query => {
    const filtered = customers.filter(customer =>
      customer.email.toLowerCase().startsWith(query.toLowerCase()),
    );
    setFilteredClients(filtered);
  };

  return (
    <>
      {isCustomersLoading ? (
        <Loading color={Colors.color7} />
      ) : (
        <View style={{flex: 1, padding: 16, backgroundColor: Colors.color7}}>
          <Searchbar
            placeholder="Search"
            onChangeText={query => {
              setSearchQuery(query);
              handleSearch(query); // Call handleSearch directly while typing
            }}
            value={searchQuery}
          />

          <ClientList
            data={searchQuery.length > 0 ? filteredClients : customers}
          />
        </View>
      )}
    </>
  );
};

export default ClientScreen;
