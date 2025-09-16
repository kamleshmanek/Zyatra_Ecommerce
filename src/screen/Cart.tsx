import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../theme/Colors';
import { Fonts } from '../assets/fonts/Fonts';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';
import Header from '../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import {updateQty } from '../redux/slice/CartSlice';
import { Txt } from '../assets/Txt';
import CartItemCard from '../component/CartItemCard';
import { useNavigation } from '@react-navigation/native';
import { useAppColors } from '../helper/useAppColors';

const Cart = () => {
  const CartData = useSelector((state: any) => state.Cart?.CartData);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
    const Colors = useAppColors();
    const styles = useStyles(Colors);

  const increaseQty = (item: any) => {
    dispatch(updateQty({ id: item?.id, qty: item?.qty + 1 }));
  };
  const decreaseQty = (item: any) => {
    dispatch(updateQty({ id: item?.id, qty: item?.qty - 1 }));
  };

  const handleShopingBtn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomNavigation' }],
    });
  };
  const subtotal = CartData.reduce((total: any, item: any) => {
    return total + item.price * (item?.qty || 0);
  }, 0);
console.log("subtotal",subtotal)
  return (
    <View style={styles.container}>
      <Header showBack showCart={false} />
      {CartData?.length == 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(32),
          }}
        >
          <Feather name="shopping-cart" size={60} color={Colors.LightGray} />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyText}>
            You haven't added anything to your Cart yet
          </Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={handleShopingBtn}
          >
            <Text style={styles.continueShoppingText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      )}
      {CartData?.length > 0 && (
        <View style={{ paddingHorizontal: scale(14) }}>
          <Text style={styles.shopingBagTxt}>
            {Txt?.ShoppingBag} ({CartData?.length})
          </Text>
        </View>
      )}
      {CartData?.length > 0 && (
        <FlatList
          data={CartData}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: scale(16) }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {subtotal > 0 && (
        <View style={styles.footer}>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalValue}>{Txt?.SubTotal}</Text>
            <Text style={styles.subtotalValue}>₹{subtotal.toFixed(2)}</Text>
          </View>
          <Text style={styles.noteText}>(Total does not include shipping)</Text>
        </View>
      )}
      {subtotal > 0 && (
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>{Txt?.Checkout}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Cart;


const useStyles = (Colors) =>StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.White },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
    borderBottomWidth: 1,
    borderColor: Colors.LightGray,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.Robotobold,
    color: Colors.Black,
  },
  headerSub: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
  },
  editText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  cartCard: {
    flexDirection: 'row',
    // alignItems: 'center',
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
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: Colors.LightGray,
  },
  subtotalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  subtotalLabel: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Black,
  },
  subtotalValue: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.Robotobold,
    color: Colors.Black,
  },
  noteText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
    marginBottom: verticalScale(12),
  },
  checkoutBtn: {
    backgroundColor: Colors.Black,
    paddingVertical: verticalScale(15),
    // borderRadius: 6,
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  checkoutText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Robotobold,
    color: Colors.White,
  },
  paypalBtn: {
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 6,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paypalText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  continueText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotoregular,
    textAlign: 'center',
    color: Colors.Gray,
  },
  shopingBagTxt: {
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(14),
  },
  continueShoppingButton: {
    backgroundColor: Colors.Black,
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  continueShoppingText: {
    color: Colors.White,
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotosemibold,
    letterSpacing: 0.5,
  },
  emptyTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.Robotosemibold,
    color: Colors.Black,
    marginVertical: verticalScale(10),
    textAlign: 'center',
  },
  emptyText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
});
