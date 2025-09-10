// components/CartItemCard.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../theme/Colors';
import { Fonts } from '../assets/fonts/Fonts';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';

type CartItemCardProps = {
  item: any;
  onIncrease: (item: any) => void;
  onDecrease: (item: any) => void;
};

const CartItemCard = ({ item, onIncrease, onDecrease }: CartItemCardProps) => {
  return (
    <View style={styles.cartCard}>
      <FastImage source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.subText}>{item?.brand}</Text>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.price}>₹{item?.price?.toFixed(2)}</Text>
      </View>
      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecrease(item)}>
          <Feather name="minus" size={15} color={Colors.Black} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item?.qty}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => onIncrease(item)}>
          <Feather name="plus" size={15} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cartCard: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: Colors.LightGray,
  },
  image: { width: scale(80), height: scale(80), borderWidth: 1 },
  info: { flex: 1, marginHorizontal: scale(10) },
  title: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  subText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
    marginVertical: verticalScale(2),
  },
  price: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Robotobold,
    color: Colors.Black,
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 6,
    padding: scale(2),
  },
  qtyText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    marginHorizontal: scale(8),
  },
});
