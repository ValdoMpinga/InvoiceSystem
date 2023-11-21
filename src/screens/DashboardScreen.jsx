import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../utils/contants';
import {useDispatch, useSelector} from 'react-redux';
import {setTestString} from '../../redux/invoiceStore';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const {testString} = useSelector(state => state.invoice);

  useEffect(() => {
    dispatch(setTestString('aaaaa'));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color5,
      }}>
      <Text>DashboardScreen {testString} </Text>
    </View>
  );
};

export default DashboardScreen;
