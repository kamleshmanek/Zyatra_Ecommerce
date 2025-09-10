import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Zyatra from '../assets/Images/Svg/Zyatra.svg';
import { Colors } from '../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../theme/dimensions';

type HeaderProps = {
  showBack?: boolean;
  onBack?: () => void;
  showCart?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBack,
  showCart = true,
}) => {
  const navigation = useNavigation<any>();
  const items  = useSelector((state: any) => state.Cart?.CartData);
  const count = items?.length || 0;


const scaleAnim = useRef(new Animated.Value(0)).current; 
const opacityAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  if (count > 0) {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.4, duration: 150, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      ]),
      Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  } else {
    Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  }
}, [count]);

  const handleGoBack = () => {
    if (onBack) onBack();
    else navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={25} color={Colors.Black} />
        </TouchableOpacity>
      ) : (
        <View style={{ width:scale(25) }} />
      )}

      <Zyatra />

      {showCart ? (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View>
            <Feather name="shopping-cart" size={25} color={Colors.Black} />
            {count > 0 && (
              <Animated.View style={[styles.badge, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.badgeText}>{count >9 ? "9+":count}</Text>
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ width:scale(25) }} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingHorizontal:scale(16),
    paddingVertical:verticalScale(8),
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: Colors.Red,
    borderRadius:moderateScale(12),
    minWidth: 18,
    height:verticalScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:scale(4),
  },
  badgeText: {
    color: Colors.White,
    fontSize:moderateScale(10),
    fontFamily:Fonts.Robotobold
  },
});
