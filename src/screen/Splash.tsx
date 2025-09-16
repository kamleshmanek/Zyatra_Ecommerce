import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../helper/useAppColors';

const Splash = () => {
    const Colors = useAppColors();
    const styles = useStyles(Colors);
  const navigation = useNavigation<any>();

useEffect(() => {
  const timer = setTimeout(() => {
    navigation.reset({
      index: 0, 
      routes: [{ name: 'BottomNavigation' }],
    });
  }, 1000);

  return () => clearTimeout(timer);
}, []);
  return (
    <View style={styles.container}>
      <FastImage
        source={{uri:"https://i.pinimg.com/originals/e4/d2/c1/e4d2c1d0da356797359acd9270bcdd77.gif"}}
        // source={require('../assets/Images/Gif/Zyatra.gif')}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Splash;

const useStyles = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  gif: {
    width: "100%",
    height:"100%",
  },
});
