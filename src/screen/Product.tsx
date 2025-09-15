import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Colors } from '../theme/Colors';
import { Fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../theme/dimensions';
import { GetProductApi } from '../redux/slice/ProductSlice';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomCarousel from '../component/CustomCarouse';
import Loader from '../component/Loader';
import Header from '../component/Header';
import { Txt } from '../assets/Txt';
import { addToCart } from '../redux/slice/CartSlice';

const Product = () => {
  const routeq: any = useRoute();
  const dispatch = useDispatch<any>();
  const { productId } = routeq.params;
  const { ProductData, ProductLoading } = useSelector(
    (state: any) => state.Product,
  );
  console.log("ProductData",ProductData)

  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProductOverview, setShowProductOverview] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    dispatch(GetProductApi(productId));
  }, [productId]);

 const handleAddToCart = () =>{
  dispatch(addToCart(ProductData));
  handleAddToCart2()
 }

   const screenHeight = Dimensions.get("window").height;

   const translateY = useRef(new Animated.Value(50)).current;
   const translateX = useRef(new Animated.Value(0)).current;    
  const opacity = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  const handleAddToCart2 = () => {
    setVisible(true);

    // reset
    translateY.setValue(50);
    opacity.setValue(0);

    // animate in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <Loader visible={ProductLoading}></Loader>
      <Header showBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomCarousel
          ref={carouselRef}
          data={ProductData.images || []}
          height={verticalScale(310)}
          loop={false}
          onIndexChange={index => {
            setActiveIndex(index);
          }}
          renderItem={({ item, index }) => {
            return (
              <FastImage
                source={{ uri: item }}
                style={styles.productImage}
                resizeMode={FastImage.resizeMode.stretch}
              />
            );
          }}
        />

        <FlatList
          data={ProductData.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => 'thumb-' + index}
          contentContainerStyle={styles.thumbnailList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                carouselRef.current?.scrollToIndex(index);
              }}
            >
              <FastImage
                source={{ uri: item }}
                style={[
                  styles.thumbnailImage,
                  {
                    borderColor:
                      activeIndex === index ? Colors.Black : Colors.LightGray,
                  },
                ]}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
        />

        <View style={styles.contentWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}>{ProductData.brand?.toUpperCase()}</Text>
          </View>
          <Text style={styles.brand}>{ProductData.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{ProductData.price}{' '}
              <Text style={{ color: Colors.Gray, fontSize: moderateScale(12) }}>
                {Txt?.MRPinclofalltaxes}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.header}
            onPress={() => setShowProductOverview(!showProductOverview)}
            activeOpacity={0.8}
          >
            <Text style={styles.titleOverview}>{Txt?.ProductOverview}</Text>
            <Entypo
              name={
                showProductOverview ? 'chevron-small-down' : 'chevron-small-up'
              }
              size={25}
              color={Colors.Black}
            />
          </TouchableOpacity>
          {showProductOverview && (
            <View style={styles.backgroundView}>
              {ProductData?.description && (
                <View style={styles.commanbodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.Description} :</Text>
                  <Text style={styles.description}>
                    {ProductData?.description}
                  </Text>
                </View>
              )}
              {ProductData?.sku && (
                <View style={styles.bodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.SKU} :</Text>
                  <Text style={[styles.description, styles.herderDiscription]}>
                    {ProductData?.sku}
                  </Text>
                </View>
              )}

              {ProductData?.weight && (
                <View style={styles.bodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.Weight} :</Text>
                  <Text style={[styles.description, styles.herderDiscription]}>
                    {ProductData?.weight} {Txt?.KG}
                  </Text>
                </View>
              )}
              {ProductData?.warrantyInformation && (
                <View style={styles.bodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.Warranty} :</Text>
                  <Text style={[styles.description, styles.herderDiscription]}>
                    {ProductData?.warrantyInformation}
                  </Text>
                </View>
              )}
              {ProductData?.shippingInformation && (
                <View style={styles.commanbodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.ShippingInfo}:</Text>
                  <Text style={styles.description}>
                    {ProductData?.shippingInformation}
                  </Text>
                </View>
              )}
              {ProductData?.category && (
                <View style={styles.commanbodyContainer}>
                  <Text style={styles.sectionHeader}>{Txt?.Category} :</Text>
                  <Text style={styles.description}>
                    {ProductData?.category}
                  </Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.header}
            onPress={() => setShowReviews(!showReviews)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.titleOverview}>{Txt?.Review}</Text>

                <View
                  style={[
                    styles.ReviewTextContainer,
                    {
                      backgroundColor:
                        ProductData.rating > 2 ? Colors?.Green : Colors?.Amber,
                    },
                  ]}
                >
                  {ProductData?.rating && (
                    <Text
                      style={{
                        color: Colors.White,
                        marginRight: 4,
                        fontFamily: Fonts.Robotomedium,
                        fontSize: moderateScale(13),
                      }}
                    >
                      {ProductData?.rating?.toFixed(1)}
                    </Text>
                  )}

                  <Entypo name="star" size={13} color={Colors.White} />
                </View>
              </View>
            </View>

            <Entypo
              name={showReviews ? 'chevron-small-down' : 'chevron-small-up'}
              size={25}
              color={Colors.Black}
            />
          </TouchableOpacity>
          {showReviews && (
            <View style={styles.backgroundView}>
              <FlatList
                data={ProductData?.reviews}
                keyExtractor={(_, index) => 'review-' + index}
                renderItem={({ item }) => (
                  <View style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Feather name="user" size={20} color={Colors.Gray} />
                        {/* <Text style={styles.reviewer}>{item.reviewerName}</Text> */}
                        {item?.reviewerName && (
                          <Text style={styles.reviewer}>
                            {item?.reviewerName}
                          </Text>
                        )}
                        {item.rating && (
                          <View
                            style={[
                              styles.ReviewTextContainer,
                              {
                                backgroundColor:
                                  item.rating > 2 ? Colors.Green : Colors.Amber,
                              },
                            ]}
                          >
                            <Text style={[styles.GreenReviewTxt]}>
                              {item.rating.toFixed(1)}
                            </Text>
                            <Entypo
                              name="star"
                              size={13}
                              color={Colors.White}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                    {item?.comment && (
                      <Text style={styles.reviewComment}>{item?.comment}</Text>
                    )}
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionRow}>
       
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={styles.cartBtnText}>{Txt?.AddtoCart}</Text>
        </TouchableOpacity>
      </View>
        {visible && (
        <Animated.View
          style={[
            styles.box,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={styles.cartBtnTextAnim}>+1</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  productImage: {
    width: '100%',
    height: verticalScale(300),
  },
  thumbnailList: {
    // paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(8),
  },
  thumbnailImage: {
    width: scale(40),
    height: scale(40),
    marginRight: scale(8),
    borderWidth: 1,
  },
  contentWrapper: {
    padding: scale(10),
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  titleOverview: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  brand: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Black,
    marginTop: verticalScale(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  ratingText: {
    marginHorizontal:scale(6),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
    fontSize: moderateScale(14),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  price: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Black,
  },
  discount: {
    marginLeft:scale(8),
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Red,
  },
  sectionHeader: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Robotomedium,
    color: Colors.Gray,
    paddingTop: verticalScale(5),
  },
  description: {
    fontFamily: Fonts.Robotoregular,
    fontSize: moderateScale(12),
    lineHeight: 20,
    color: Colors.Black,
    paddingHorizontal: scale(2),
  },
  info: {
    fontFamily: Fonts.Robotoregular,
    fontSize: moderateScale(14),
    marginVertical: verticalScale(2),
    color: Colors.Black,
  },
  reviewCard: {
    backgroundColor: Colors.LightGray + '30',
    borderRadius:moderateScale(8),
    padding: scale(5),
    marginBottom: verticalScale(10),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewer: {
    marginLeft:scale(8),
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(12),
    color: Colors.Gray,
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop:verticalScale(4),
  },
  reviewComment: {
    marginTop:verticalScale(4),
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(12),
    color: Colors.Black,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: scale(14),
    borderTopWidth: 1,
    borderColor: Colors.LightGray,
    backgroundColor: Colors.White,
  },
  cartBtnText: {
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(15),
    color: Colors.White,
  },
  cartBtn: {
    flex: 1,
    backgroundColor: Colors.Black,
    alignItems: 'center',
    height: scale(55),
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(2),
  },
  backgroundView: {
    backgroundColor: Colors.BackgroundGray,
    padding: 10,
    margin: 2,
  },
  bodyContainer: {
    marginVertical: verticalScale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  commanbodyContainer: {
    marginVertical: verticalScale(4),
  },
  herderDiscription: {
    paddingTop: verticalScale(6),
  },
  ReviewTextContainer: {
    backgroundColor: Colors.Green,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(1),
    marginLeft: scale(8),
  },
  GreenReviewTxt: {
    color: Colors.White,
    marginRight: scale(2),
    fontSize: moderateScale(10),
    fontFamily: Fonts.Robotoregular,
  },
   box: {
    width: 20,
    height: 20,
    backgroundColor: Colors.Black,
    borderRadius: 8,
    position: "absolute", 
    right:12
  },
    cartBtnTextAnim: {
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(12),
    color: Colors.White,
  },
});
