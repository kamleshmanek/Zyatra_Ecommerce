import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/Colors';

const Splash = () => {
  const navigation = useNavigation<any>();

useEffect(() => {
  const timer = setTimeout(() => {
    navigation.reset({
      index: 0, 
      routes: [{ name: 'BottomNavigation' }],
    });
  }, 2000);

  return () => clearTimeout(timer);
}, []);
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/Images/Gif/Zyatra.gif')}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  gif: {
    width: 200,
    height: 200,
  },
});
