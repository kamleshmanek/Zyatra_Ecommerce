import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import { Colors } from '../theme/Colors'

const Wishlist = () => {
  return (
    <View style={{flex:1,backgroundColor:Colors.White}}>
      <Header/>
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({})