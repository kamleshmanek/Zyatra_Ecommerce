import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Header from '../component/Header';
import { Colors } from '../theme/Colors';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { Fonts } from '../assets/fonts/Fonts';
import {
  removeFromWishlist,
  moveToCart,
} from '../redux/slice/WishlistSlice';
import { addToCart } from '../redux/slice/CartSlice';
import { Txt } from '../assets/Txt';
import { useAppColors } from '../helper/useAppColors';

type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  [key: string]: any;
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - scale(40)) / 2;

const Wishlist = () => {
    const Colors = useAppColors();
    const styles = useStyles(Colors);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items);
  console.log('wishlistItems', wishlistItems);

  const handleRemoveFromWishlist = useCallback(
    (itemId: string) => {
      dispatch(removeFromWishlist(itemId));
    },
    [dispatch],
  );

  const handleMoveToCart = useCallback(
    (item: any) => {
      dispatch(moveToCart(item?.id));
      dispatch(addToCart(item));
      dispatch(removeFromWishlist(item?.id));
    },
    [dispatch],
  );

  const handleProductPress = useCallback(
    (product: any) => {
      navigation.navigate('Product', { productId: product.id });
    },
    [navigation],
  );

  const handleContinueShopping = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleProductPress(item)}>
          <Image
            source={{ uri: item?.thumbnail }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromWishlist(item.id)}
        >
          <Feather name="x" size={20} color={Colors.White} />
        </TouchableOpacity>
        {item?.discountPercentage && item?.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {item?.discountPercentage}% OFF
            </Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item?.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item?.price?.toLocaleString()}</Text>
          {item?.originalPrice && item?.originalPrice > item?.price && (
            <Text style={styles.originalPrice}>
              ₹{item?.originalPrice?.toLocaleString()}
            </Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          {item?.brand ? (
            <Text style={styles.detailText}>{item?.brand}</Text>
          ) : (
            <Text style={styles.detailText}>{''}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.moveToCartButton}
          onPress={() => handleMoveToCart(item)}
        >
          <Text style={styles.moveToCartText}>MOVE TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {wishlistItems.length > 0 && (
        <View style={{ paddingHorizontal: scale(14) }}>
          <Text style={styles.shopingBagTxt}>
            {Txt?.whishlist} ({wishlistItems.length})
          </Text>
        </View>
      )}
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather
            name="heart"
            size={60}
            color={Colors.LightGray}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptyText}>
            You haven't added anything to your wishlist yet
          </Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueShoppingText}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Wishlist;

const useStyles = (Colors) =>StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  listContent: {
    padding: scale(16),
    paddingBottom: verticalScale(24),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: Colors.White,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.Black,
    marginBottom: verticalScale(16),
  },
  imageContainer: {
    width: '100%',
    height: ITEM_WIDTH * 0.9,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scale(15),
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  discountBadge: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    backgroundColor: Colors.Black,
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    zIndex: 1,
    fontSize: moderateScale(8),
    fontFamily: Fonts.Robotosemibold,
  },
  discountText: {
    color: Colors.White,
    fontSize: 12,
    fontFamily: Fonts.Robotosemibold,
  },
  productInfo: {
    padding: moderateScale(6),
    paddingTop: verticalScale(7),
  },
  productName: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Gray,
    marginBottom: verticalScale(3),
    overflow: 'hidden',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  price: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotobold,
    color: Colors.Black,
    marginRight: scale(8),
    marginTop: verticalScale(2),
  },
  originalPrice: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
    textDecorationLine: 'line-through',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  detailText: {
    fontSize: moderateScale(12),
    color: Colors.Gray,
    marginRight: scale(8),
  },
  colorBox: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  moveToCartButton: {
    backgroundColor: Colors.Black,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    marginTop: verticalScale(12),
    width: '100%',
  },
  moveToCartText: {
    color: Colors.White,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotosemibold,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  emptyIcon: {
    marginBottom: verticalScale(20),
  },
  emptyTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.Robotosemibold,
    color: Colors.Black,
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  emptyText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
    textAlign: 'center',
    marginBottom: verticalScale(20),
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
  shopingBagTxt: {
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(14),
  },
});
