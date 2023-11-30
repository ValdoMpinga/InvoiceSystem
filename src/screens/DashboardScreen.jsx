// DashboardScreen.js
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DashboardItem from '../components/DashboardItem';
import {Colors} from '../utils/contants';
import Loading from '../components/Loading';

const DashboardScreen = () => {
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {});
  return (
    <>
      {isDataLoading ? (
        <View style={styles.container}>
          <Loading color={Colors.color1} />
        </View>
      ) : (
        <View style={styles.container}>
          <DashboardItem
            title="Clients"
            number={50}
            iconName="persons"
            iconColor="black"
            color="#3498db"
          />
          <DashboardItem
            title="Orders"
            number={20}
            iconName="shopping-package"
            iconColor="black"
            color="#e74c3c"
          />

          <DashboardItem
            title="Products"
            number={15}
            iconName="list-2"
            iconColor="black"
            color="#2ecc71"
          />

          <DashboardItem
            title="Invoices"
            number={5}
            iconName="file-1"
            iconColor="black"
            color="#f39c12"
          />
          {/* Add more DashboardItem components as needed */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: Colors.color3,
  },
});

export default DashboardScreen;
