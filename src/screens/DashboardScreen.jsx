// DashboardScreen.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DashboardItem from '../components/DashboardItem';
import {Colors} from '../utils/contants';
import Loading from '../components/Loading';
import {API_URL} from '../utils/contants';

const DashboardScreen = () => {
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [clientsCount, setClientsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(false);
  const [invoicesCount, setInvoicesCount] = useState(false);

  let customersCountEndpoint = API_URL + '/customer/get-customers-count';
  let productsCountEndpoint = API_URL + '/product/get-products-count';
  let invoicesCountEndpoint = API_URL + '/invoice/get-invoices-count';

  useEffect(() => {
    dashboardDataSetter();
  }, []);

  const dashboardDataSetter = async () => {
    let customerCount = await dashboardDataFetcher(customersCountEndpoint);
    setClientsCount(customerCount);

    let productCount = await dashboardDataFetcher(productsCountEndpoint);
    setProductsCount(productCount);

    let invoiceCount = await dashboardDataFetcher(invoicesCountEndpoint);
    setInvoicesCount(invoiceCount);

    setIsDataLoading(false);
  };

  async function dashboardDataFetcher(endpoint) {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data = await response.json();

    return data.count;
  }

  return (
    <View style={styles.container}>
      {isDataLoading ? (
        <Loading color={Colors.color1} />
      ) : (
        <>
          <Text
            style={{
              color: Colors.black,
              fontSize: 30,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginLeft: 20,
              marginTop: 20,
              fontFamily: 'monospace',
            }}>
            Dashboard
          </Text>

          <View style={styles.innerContainer}>
            <DashboardItem
              title="Clients"
              number={clientsCount}
              iconName="persons"
              iconColor="black"
              color="#3498db"
            />

            <DashboardItem
              title="Products"
              number={productsCount}
              iconName="list-2"
              iconColor="black"
              color="#2ecc71"
            />

            <DashboardItem
              title="Invoices"
              number={invoicesCount}
              iconName="file-1"
              iconColor="black"
              color="#f39c12"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.color3,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center horizontally
    flexWrap: 'wrap',
    padding: 10,
    marginTop: 130
  },
});

export default DashboardScreen;
