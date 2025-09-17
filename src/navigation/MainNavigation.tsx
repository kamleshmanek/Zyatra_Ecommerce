import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import BottomNavigation from './BottomNavigation';
import Splash from '../screen/Splash';
import Collection from '../screen/Collection';
import Product from '../screen/Product';
import Cart from '../screen/Cart';
import Boarding from '../screen/Boarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screen/Login';
import { useAppColors } from '../helper/useAppColors';
import ForgotPassword from '../screen/ForgotPassword';
import Signup from '../screen/Signup';
import WebViewScreen from '../screen/WebViewScreen';
import Address from '../screen/Address';
import AddEditAddress from '../screen/AddEditAddress';

const MainNavigation = () => {
  const Colors = useAppColors();
  const [loading, setLoading] = useState(true);
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    checkLaunch();
  }, []);
  const checkLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null) {
        // first launch
        setFirstLaunch(true);
        await AsyncStorage.setItem('alreadyLaunched', 'true');
      } else {
        setFirstLaunch(false);
      }
    } catch (e) {
      console.log('Error reading AsyncStorage:', e);
    } finally {
      setLoading(false);
    }
  };
  if(loading){
    return<View style={{flex:1,backgroundColor:Colors.White}}></View>
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} 
      // initialRouteName={"ForgotPassword"}
      initialRouteName={firstLaunch && !loading?'Boarding':'Splash'}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Boarding" component={Boarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddEditAddress" component={AddEditAddress} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})