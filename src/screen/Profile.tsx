import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import { Colors } from '../theme/Colors'

const Profile = () => {
  return (
     <View style={{flex:1,backgroundColor:Colors.White}}>
      <Header/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})