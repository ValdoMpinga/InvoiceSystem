import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, BackHandler} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from '../utils/contants';
import {useRoute, useNavigation} from '@react-navigation/native';
import {WaveIndicator} from 'react-native-indicators';

const InvoiceViewScreen = () => {
  const [pdfUri, setPdfUri] = useState('');
  const route = useRoute();
  const insertedInvoiceId = route.params?.insertedInvoiceId;
  const navigation = useNavigation();

  useEffect(() =>
  {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {

        navigation.navigate('Invoice'); // Replace 'Home' with the screen you want to navigate to
        return true; // Prevent default behavior (closing the app)
      },
    );

    getInvoicePdf();


    return () => {
      backHandler.remove();
    };
  }, []);

  const getInvoicePdf = async () => {
    const serverEndpoint = `${API_URL}/invoice/get`;

    fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({invoice_id: insertedInvoiceId}),
    })
      .then(response => response.text())
      .then(base64String => {
        const localFilePath = `${RNFetchBlob.fs.dirs.DocumentDir}/temp.pdf`;

        // Check if the file exists, and overwrite if necessary
        RNFetchBlob.fs
          .writeFile(localFilePath, base64String, 'base64')
          .then(() => {
            setPdfUri(localFilePath);
          })
          .catch(error => {
            console.error('Error writing file:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  };

  if (!pdfUri) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <WaveIndicator size={100} color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: pdfUri, cache: true}}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.error('PDF viewer error:', error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default InvoiceViewScreen;
