import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { Fonts } from '../assets/fonts/Fonts';
import { Colors } from '../theme/Colors';
import { scale, moderateScale, verticalScale } from '../theme/dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = scale(10);
const CARD_WIDTH = width / 2 - CARD_MARGIN * 1.3;

interface ProductCardProps {
  item: any;
  likedItems: { [key: string]: boolean };
  toggleLike: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  likedItems,
  toggleLike,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      {/* Image Slider */}

      {/* <TouchableOpacity onPress={() => navigation.navigate('Product',{productId:item.id})}> */}
      <View style={{ borderWidth: 1, borderColor: Colors.Black }}>
        {item.images && item.images.length > 0 ? (
          <View>
            <FlatList
              data={item.images}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(img, index) => index.toString()}
              onMomentumScrollEnd={e => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x / CARD_WIDTH,
                );
                setActiveIndex(index);
              }}
              renderItem={({ item: img }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Product', { productId: item.id })
                  }
                >
                  <FastImage
                    source={{ uri: img }}
                    style={[styles.cardImage, { width: CARD_WIDTH }]}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              )}
              style={{ width: CARD_WIDTH }}
            />

            {item?.images?.length > 3 ? (
              <View style={styles.paginationContainer}>
                {[0, 1, 2].map(dotIndex => {
                  let isActive = false;

                  if (dotIndex === 0 && activeIndex === 0) {
                    isActive = true; // first
                  } else if (
                    dotIndex === 2 &&
                    activeIndex === item.images.length - 1
                  ) {
                    isActive = true; // last
                  } else if (
                    dotIndex === 1 &&
                    activeIndex > 0 &&
                    activeIndex < item.images.length - 1
                  ) {
                    isActive = true; // middle
                  }

                  return (
                    <View
                      key={dotIndex}
                      style={[
                        styles.dot,
                        {
                          backgroundColor: isActive
                            ? Colors.Black
                            : 'rgba(0,0,0,0.3)',
                        },
                      ]}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={styles.paginationContainer}>
                {item?.images?.map((_: string, i: number) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          i === activeIndex ? Colors.Black : 'rgba(0,0,0,0.3)',
                      },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product', { productId: item.id })
            }
          >
            <FastImage
              source={{ uri: item.thumbnail }}
              style={[styles.cardImage, { width: CARD_WIDTH }]}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => toggleLike(item.id)}
          style={styles.likeIcon}
        >
          <Entypo
            name={likedItems[item.id] ? 'heart' : 'heart-outlined'}
            size={moderateScale(30)}
            color={likedItems[item.id] ? Colors.Black : Colors.Black}
          />
        </TouchableOpacity>
      </View>
      {/* </TouchableOpacity> */}
      {/* Product Info */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '98%',
        }}
      >
        {item?.brand && <Text style={styles.cardTitle}>{item?.brand}</Text>}
      </View>
      {item.title && <Text style={styles.cardTitle}>{item.title}</Text>}
      {item.price && <Text style={styles.cardPrice}>₹{item.price}</Text>}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.White,
    marginBottom: CARD_MARGIN * 2,
  },
  cardImage: {
    width: '98%',
    height: verticalScale(240),
    // borderWidth: 1,
    borderColor: Colors.Black,
  },
  likeIcon: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  cardTitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.Robotomedium,
  },
  cardPrice: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotoregular,
    color: Colors.Gray,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginHorizontal: scale(3),
  },
});
