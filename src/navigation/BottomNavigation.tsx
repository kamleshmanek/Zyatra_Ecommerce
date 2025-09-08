import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Search from '../screen/Search';
import Category from '../screen/Category';
import Feather from "react-native-vector-icons/Feather";
import { Colors } from '../theme/Colors';
import { Fonts } from '../assets/fonts/Fonts';
import { moderateScale } from '../theme/dimensions';
import Wishlist from '../screen/Wishlist';

const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Category') {
            iconName = 'grid';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }else if (route.name === 'Wishlist') {
            iconName = 'heart';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.Black,
        tabBarInactiveTintColor: Colors.Gray,
        tabBarLabelStyle: {
          fontFamily: Fonts.Robotomedium,
          fontSize: moderateScale(11),
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Category" component={Category} /> */}
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})
