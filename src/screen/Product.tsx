import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
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

const Product = () => {
  const routeq: any = useRoute();
  const dispatch = useDispatch<any>();
  const { productId } = routeq.params;
  const { ProductData, ProductLoading } = useSelector(
    (state: any) => state.Product,
  );

  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProductOverview, setShowProductOverview] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    dispatch(GetProductApi(productId));
  }, [productId]);

  if (ProductLoading) {
    return <Loader visible />;
  }

  if (!ProductData) return null;

  return (
    <View style={styles.container}>
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

        {/* Thumbnails */}
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
                // carouselRef.current?.scrollToIndex?.({ index, animated: true });
                // setActiveIndex(index);
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
                MRP incl.of all taxes
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.header}
            onPress={() => setShowProductOverview(!showProductOverview)}
            activeOpacity={0.8}
          >
            <Text style={styles.titleOverview}>Product Overview</Text>
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
              <View style={styles.commanbodyContainer}>
                <Text style={styles.sectionHeader}>Description :</Text>
                <Text style={styles.description}>
                  {ProductData?.description}
                </Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionHeader}>SKU :</Text>
                <Text style={[styles.description, styles.herderDiscription]}>
                  {ProductData?.sku}
                </Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionHeader}>Weight :</Text>
                <Text style={[styles.description, styles.herderDiscription]}>
                  {ProductData?.weight} KG
                </Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.sectionHeader}>Warranty :</Text>
                <Text style={[styles.description, styles.herderDiscription]}>
                  {ProductData?.warrantyInformation}
                </Text>
              </View>

              <View style={styles.commanbodyContainer}>
                <Text style={styles.sectionHeader}>Shipping Info. :</Text>
                <Text style={styles.description}>
                  {ProductData?.shippingInformation}
                </Text>
              </View>
              <View style={styles.commanbodyContainer}>
                <Text style={styles.sectionHeader}>Category :</Text>
                <Text style={styles.description}>{ProductData?.category}</Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.header}
            onPress={() => setShowReviews(!showReviews)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.titleOverview}>Review</Text>

                <View style={styles.ReviewTextContainer}>
                  <Text style={{ color: Colors.White, marginRight: 4 }}>
                    {ProductData.rating.toFixed(1)}
                  </Text>
                  <Entypo name="star" size={16} color={Colors.White} />
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
                data={ProductData.reviews}
                keyExtractor={(_, index) => 'review-' + index}
                renderItem={({ item }) => (
                  <View style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Feather name="user" size={20} color={Colors.Gray} />
                        <Text style={styles.reviewer}>{item.reviewerName}</Text>

                        <View style={[styles.ReviewTextContainer,{
                            backgroundColor:item.rating > 2 ? Colors.Green : '#ffb300ff',
                        }]}>
                          <Text
                            style={[
                              styles.GreenReviewTxt,
                             
                            ]}
                          >
                            {item.rating.toFixed(1)}
                          </Text>
                          <Entypo name="star" size={13} color={Colors.White} />
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{item.comment}</Text>
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.description}>{ProductData.description}</Text>

        
          <Text style={styles.sectionHeader}>Product Information</Text>
          <Text style={styles.info}>
            Warranty: {ProductData.warrantyInformation}
          </Text>
          <Text style={styles.info}>
            Shipping: {ProductData.shippingInformation}
          </Text>
          <Text style={styles.info}>
            Availability: {ProductData.availabilityStatus}
          </Text>
          <Text style={styles.info}>
            Return Policy: {ProductData.returnPolicy}
          </Text> */}

          {/* Reviews */}
          {/* <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>Reviews</Text>
            {Array.from({ length: 5 }).map((_, i) => (
              <Entypo
                key={i}
                name={
                  i < Math.round(ProductData.rating) ? 'star' : 'star-outlined'
                }
                size={20}
                color={i < Math.round(ProductData.rating) ? '#FFD700' : '#ddd'}
              />
            ))}
          </View> */}

          {/* <FlatList
            data={ProductData.reviews}
            keyExtractor={(_, index) => 'review-' + index}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Feather name="user" size={20} color={Colors.Gray} />
                  <Text style={styles.reviewer}>{item.reviewerName}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Feather
                      key={i}
                      name="star"
                      size={16}
                      color={i < item.rating ? '#FFD700' : '#ddd'}
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{item.comment}</Text>
              </View>
            )}
            scrollEnabled={false}
          /> */}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
    marginHorizontal: 6,
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
    marginLeft: 8,
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
    borderRadius: 8,
    padding: scale(10),
    marginBottom: verticalScale(10),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewer: {
    marginLeft: 8,
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(12),
    color: Colors.Gray,
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  reviewComment: {
    marginTop: 4,
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
    paddingVertical: verticalScale(2),
    marginLeft: scale(8),
  },
  GreenReviewTxt: {
    color: Colors.White,
    marginRight: scale(2),
    fontSize: moderateScale(10),
    fontFamily: Fonts.Robotoregular,
  },
});
