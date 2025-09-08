import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../theme/Colors';
import Header from '../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { TopCategoryCategories } from '../redux/slice/CatgeorySlice';
import FastImage from 'react-native-fast-image';
import { Fonts } from '../assets/fonts/Fonts';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';

const Category = () => {
  const dispatch = useDispatch<any>();
  const { Topcategories } = useSelector((state: any) => state.category);

  useEffect(() => {
    dispatch(TopCategoryCategories());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header />

      <View style={styles.sectionWrapper}>
        <FlatList
          horizontal
          data={Topcategories}
          keyExtractor={(item, index) => item?.name || index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: scale(4) }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryWrapper}>
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
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  sectionWrapper: {
    marginHorizontal: scale(14),
    marginTop: verticalScale(20),
  },
  categoryWrapper: {
    width: scale(90),
    alignItems: 'center',
    marginRight: scale(12),
  },
  imageWrapper: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40), // half of width/height → perfect circle
    borderWidth: 1,
    borderColor: Colors.Gray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.White,
    marginBottom: verticalScale(6),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: moderateScale(14),
    color: Colors.Black,
    textAlign: 'center',
    fontFamily: Fonts.Robotoregular,
    width: '100%',
  },
});
