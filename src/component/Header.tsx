import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Zyatra from '../assets/Images/Svg/Zyatra.svg'
import { Colors } from '../theme/Colors'
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  showBack?: boolean;
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({ showBack = false, onBack }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onBack) {
      onBack();   // run custom callback
    } else {
      navigation.goBack(); // fallback
    }
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={25} color={Colors.Black} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 25 }} />
      )}

      <Zyatra />

      <TouchableOpacity>
        <Feather name="shopping-cart" size={25} color={Colors.Black} />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingHorizontal: 16,
  },
})
