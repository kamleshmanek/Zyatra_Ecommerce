import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import { useAppColors } from '../helper/useAppColors';
import CustomCarousel from '../component/CustomCarouse';
import Loader from '../component/Loader';
import { useDispatch, useSelector } from 'react-redux';
import BrandCarousel from '../component/BrandCarousel';
import { Fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../theme/dimensions';
import { carouselData, carouselData2 } from '../helper/StaticData';
import { chunkArray } from '../helper/chunkArray';
import FastImageBanner from '../component/FastImageBanner';
import ProductRow from '../component/ProductRow';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { GetCollectionApi } from '../redux/slice/CollectionSlice';
import { Txt } from '../assets/Txt';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const colors = useAppColors();
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const { categories, loading, BrandData, Brandloading } = useSelector(
    (state: any) => state.home,
  );

  const { Topcategories } = useSelector((state: any) => state.category);

  const beautyData = categories?.beauty?.products || [];
  const womensBagsData = categories?.womensbag?.products || [];

  const handleTopCategoryPress = (categoryName: string) => {
    dispatch(GetCollectionApi(categoryName));
    navigation.navigate('Collection', { handle: categoryName });
  };

  const styles = getStyles(colors);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.White }]}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <Loader visible={loading || Brandloading} />

        <View >
          <CustomCarousel
            data={carouselData}
            height={verticalScale(230)}
            autoplay
            loop
            renderItem={({ item }) => (
              <View style={styles.carouselItemContainer}>
                <FastImageBanner uri={item.uri} />
              </View>
            )}
          />
        </View>

        <View style={styles.sectionWrapper}>
          <FlatList
            horizontal
            data={Topcategories}
            keyExtractor={(item, index) => item?.name || index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: scale(4) }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryWrapper}
                onPress={() => handleTopCategoryPress(item?.slug)}
              >
                <View style={styles.imageWrapper}>
                  <FastImage
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <Text style={styles.categoryText} numberOfLines={2}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {beautyData.length > 0 && (
          <View style={styles.sectionWrapper}>
            <View style={[styles.headerRow]}>
              <Text style={styles.sectionTitle}>
                {categories?.beauty?.name}
              </Text>
              <TouchableOpacity
                style={styles.viewAllWrapper}
                onPress={() =>
                  handleTopCategoryPress(categories?.beauty?.handle)
                }
              >
                <Text style={styles.viewAllBtn}>{Txt.ViewAll}</Text>
                <Feather name="chevron-right" size={16} color={colors.Gray} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={chunkArray(beautyData.slice(2, 4), 2)}
              renderItem={({ item }) => (
                <ProductRow
                  products={item}
                  onPress={product =>
                    navigation.navigate('Product', { productId: product.id })
                  }
                />
              )}
              keyExtractor={(_, index) => 'beauty-' + index}
              scrollEnabled={false}
            />
          </View>
        )}

        <View style={styles.carouselWrapper}>
          <CustomCarousel
            data={carouselData2}
            height={verticalScale(230)}
            showPagination={false}
            autoplay
            loop
            renderItem={({ item }) => (
              <View style={styles.carouselItemContainer}>
                <FastImageBanner uri={item.uri} />
              </View>
            )}
          />
        </View>

        {womensBagsData.length > 0 && (
          <View style={styles.sectionWrapper}>
            <View style={styles.headerRow}>
              <Text style={styles.sectionTitle}>
                {categories?.womensbag?.name}
              </Text>
              <TouchableOpacity
                style={styles.viewAllWrapper}
                onPress={() =>
                  handleTopCategoryPress(categories?.womensbag?.handle)
                }
              >
                <Text style={styles.viewAllBtn}>{Txt.ViewAll}</Text>
                <Feather name="chevron-right" size={16} color={colors.Gray} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={chunkArray(womensBagsData.slice(0, 4), 2)}
              renderItem={({ item }) => (
                <ProductRow
                  products={item}
                  onPress={product =>
                    navigation.navigate('Product', { productId: product.id })
                  }
                />
              )}
              keyExtractor={(_, index) => 'bags-' + index}
              scrollEnabled={false}
            />
          </View>
        )}

        <View style={styles.gifBanner}>
          <FastImageBanner uri="https://i.pinimg.com/originals/cc/b3/4f/ccb34f51bba6597deec3bf36ed654315.gif" />
        </View>

        {BrandData?.length > 0 && (
          <BrandCarousel data={BrandData} interval={2500} />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },

  scrollContainer: {
    flex: 1,
  },

  sectionWrapper: {
    marginHorizontal: scale(10),
    marginTop: verticalScale(20),
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Robotomedium,
    color: colors.Black,
  },

  viewAllBtn: {
    color: colors.Gray,
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(13),
    marginRight: scale(4),
  },
  viewAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselWrapper: {
    marginTop: verticalScale(10),
  },

  carouselItemContainer: {
    flex: 1,
    overflow: 'hidden',
    // borderWidth: scale(1),
    // borderColor: Colors.LightGray,
  },

  gifBanner: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: scale(1),
    borderColor: colors.LightGray,
    height: verticalScale(230),
    marginTop: verticalScale(5),
  },
  flatListBackground: {
    width: '100%',
    // marginTop: 10,
    borderRadius: 8,
    flex: 1,
  },

  categoryWrapper: {
    width: scale(90),
    alignItems: 'center',
    marginRight: scale(12),
  },
  imageWrapper: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 1,
    borderColor: colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.White,
    marginBottom: verticalScale(6),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: moderateScale(11),
    color: colors.Black,
    textAlign: 'center',
    fontFamily: Fonts.Robotoregular,
    width: '100%',
  },
});
