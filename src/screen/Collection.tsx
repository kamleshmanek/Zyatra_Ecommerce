import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { useAppColors } from '../helper/useAppColors';
import { Fonts } from '../assets/fonts/Fonts';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../component/ProductCard';
import { Txt } from '../assets/Txt';
import { addToWishlist } from '../redux/slice/WishlistSlice';

const { width } = Dimensions.get('window');
const CARD_MARGIN = scale(10);
const CARD_WIDTH = width / 2 - CARD_MARGIN * 1.3;

const Collection = () => {
  const colors = useAppColors();
  const styles = getStyles(colors);
  const dispatch = useDispatch<any>();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string>('new');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { collectionData, collectionLoading, collectionError } = useSelector(
    (state: any) => state.Collection,
  );

  useEffect(() => {
    wishlistItems?.map((item: any) => {
      setLikedItems(prev => ({
        ...prev,
        [item?.id]: true,
      }));
    });
  }, [wishlistItems]);

  const toggleLike = (item: any) => {
    dispatch(addToWishlist(item));
    setLikedItems(prev => ({
      ...prev,
      [item?.id]: !prev[item?.id],
    }));
  };

  const sortOptions = [
    { key: 'new', label: 'New Arrivals' },
    { key: 'lowToHigh', label: 'Price (Lowest to Highest)' },
    { key: 'highToLow', label: 'Price (Highest to Lowest)' },
  ];

  const filterOptions = [
    { key: 'women', label: 'Women' },
    { key: 'solid', label: 'Solid' },
    { key: 'floral', label: 'Floral' },
  ];

  const toggleFilter = (key: string) => {
    setSelectedFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.White }}>
      <Header showBack />

      <View style={styles.actionsRow}>
        <Text style={styles.TitleTop}>
          {collectionData?.products?.[0]?.category
            ? collectionData.products[0].category.charAt(0).toUpperCase() +
              collectionData.products[0].category.slice(1)
            : ''}
        </Text>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={styles.sortButton}
        >
          <Feather
            name="arrow-up-down"
            size={moderateScale(16)}
            color={colors.Black}
          />
          <Text style={[styles.actionText, { marginLeft: 4 }]}>
            {Txt?.Sort}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={collectionData?.products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            likedItems={likedItems}
            toggleLike={toggleLike}
          />
        )}
      />

      <Modal visible={sortModalVisible} animationType="slide" transparent>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setSortModalVisible(false)}
        >
          <Pressable style={styles.modalBox} onPress={e => e.stopPropagation()}>
            <View style={{ padding: 15 }}>
              <Text style={styles.modalTitle}>{Txt?.SortBy}</Text>
              {sortOptions.map(opt => (
                <Pressable
                  key={opt.key}
                  style={styles.optionRow}
                  onPress={() => setSortOption(opt.key)}
                >
                  <Text
                    style={{
                      color:
                        sortOption === opt.key ? colors.Black : colors.Gray,
                    }}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setSortModalVisible(false)}
            >
              <Text style={styles.applyText}>{Txt?.Apply}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={filterModalVisible} animationType="slide" transparent>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setFilterModalVisible(false)}
        >
          <Pressable style={styles.modalBox} onPress={e => e.stopPropagation()}>
            <Text style={styles.modalTitle}>{Txt?.Filter}</Text>
            {filterOptions.map(opt => (
              <Pressable
                key={opt.key}
                style={styles.optionRow}
                onPress={() => toggleFilter(opt.key)}
              >
                <Text
                  style={{
                    color: selectedFilters.includes(opt.key)
                      ? colors.Black
                      : colors.Gray,
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.applyText}>{Txt?.ApplyFilter}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Collection;

const getStyles = (colors: any) => StyleSheet.create({
  listContainer: { padding: CARD_MARGIN },
  TitleTop: { fontSize: moderateScale(16), fontFamily: Fonts.Robotobold,color:colors.Black },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
    paddingBottom: 5,
  },
  actionText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Robotomedium,
    color: colors.Black,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.White,
    marginBottom: CARD_MARGIN * 2,
  },
  cardImage: {
    width: '98%',
    height: verticalScale(240),
    borderWidth: 1,
    borderColor: colors.Black,
  },
  likeIcon: { position: 'absolute', top: 10, right: 10 },
  cardTitle: { fontSize: moderateScale(13), fontFamily: Fonts.Robotomedium },
  cardPrice: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.Robotoregular,
    color: colors.Gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalBox: { backgroundColor: colors.White },
  modalTitle: {
    fontSize: 16,
    fontFamily: Fonts.Robotomedium,
    marginBottom: 10,
  },
  optionRow: { paddingVertical: 12 },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyBtn: { backgroundColor: colors.Black, padding: 13, marginTop: 10 },
  applyText: {
    color: colors.White,
    textAlign: 'center',
    fontFamily: Fonts.Robotomedium,
    fontSize: moderateScale(15),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
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
