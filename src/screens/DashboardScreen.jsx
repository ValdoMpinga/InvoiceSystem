// DashboardScreen.js

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
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

  dashboardDataSetter = async () => {
    let customerCount = await dashboardDataFetcher(customersCountEndpoint);
    setClientsCount(customerCount);

    let productCount = await dashboardDataFetcher(productsCountEndpoint);
    setProductsCount(productCount);

    let invoiceCount = await dashboardDataFetcher(invoicesCountEndpoint);
    setInvoicesCount(invoiceCount);

    setIsDataLoading(false)
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

          <DashboardItem
            title="Something..."
            number={20}
            iconName="shopping-package"
            iconColor="black"
            color="#e74c3c"
          />
          {/* Add more DashboardItem components as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.color3,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
    alignItems: 'center', // Center items vertically
  },
});

export default DashboardScreen;
