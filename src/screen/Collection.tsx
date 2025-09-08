import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Pressable, Dimensions 
} from 'react-native'
import React, { useState } from 'react'
import Header from '../component/Header'
import { Colors } from '../theme/Colors'
import { Fonts } from '../assets/fonts/Fonts'
import { scale, verticalScale, moderateScale } from '../theme/dimensions'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import ProductCard from '../component/ProductCard'

const { width } = Dimensions.get('window');
const CARD_MARGIN = scale(10);
const CARD_WIDTH = (width / 2) - (CARD_MARGIN * 1.3);

const dummyData = [
  { id: '1', name: 'Nike Shoes', price: 2999, image: 'https://picsum.photos/200/300?random=1' },
  { id: '2', name: 'Apple Watch', price: 19999, image: 'https://picsum.photos/200/300?random=2' },
  { id: '3', name: 'Smartphone', price: 15999, image: 'https://picsum.photos/200/300?random=3' },
  { id: '4', name: 'Headphones', price: 2999, image: 'https://picsum.photos/200/300?random=4' },
]

const Collection = () => {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string>('new');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const {collectionData,collectionLoading,collectionError} = useSelector((state: any) => state.Collection);


  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
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
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header showBack />

      <View style={styles.actionsRow}>
        {/* <View style={{ width: 20 }} /> */}
<Text style={styles.TitleTop}>
  {collectionData?.products?.[0]?.category
    ? collectionData.products[0].category.charAt(0).toUpperCase() +
      collectionData.products[0].category.slice(1)
    : ""}
</Text>
       <TouchableOpacity 
  onPress={() => setSortModalVisible(true)} 
  style={{ flexDirection: "row", alignItems: "center" }}
>
  <Feather name="arrow-up-down" size={moderateScale(16)} color={Colors.Black} />
  <Text style={[styles.actionText, { marginLeft: 4 }]}>Sort</Text>
</TouchableOpacity>

        {/* <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.actionText}>☰ Filter</Text>
        </TouchableOpacity> */}
      </View>
<FlatList
  data={collectionData?.products}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: "space-between" }}
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
    onPress={() => setSortModalVisible(false)} // tap backdrop = close
  >
    <Pressable
      style={styles.modalBox}
      onPress={(e) => e.stopPropagation()} // stop bubbling
    >
      <View style={{ padding: 15 }}>
        <Text style={styles.modalTitle}>Sort By</Text>
        {sortOptions.map((opt) => (
          <Pressable
            key={opt.key}
            style={styles.optionRow}
            onPress={() => setSortOption(opt.key)}
          >
            <Text
              style={{ color: sortOption === opt.key ? Colors.Black : Colors.Gray }}
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
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </Pressable>
  </Pressable>
</Modal>

{/* Filter Modal */}
<Modal visible={filterModalVisible} animationType="slide" transparent>
  <Pressable
    style={styles.modalContainer}
    onPress={() => setFilterModalVisible(false)} // tap backdrop = close
  >
    <Pressable
      style={styles.modalBox}
      onPress={(e) => e.stopPropagation()} // prevent closing if tapping inside
    >
      <Text style={styles.modalTitle}>Filter</Text>
      {filterOptions.map((opt) => (
        <Pressable
          key={opt.key}
          style={styles.optionRow}
          onPress={() => toggleFilter(opt.key)}
        >
          <Text
            style={{
              color: selectedFilters.includes(opt.key)
                ? Colors.Black
                : Colors.Gray,
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
        <Text style={styles.applyText}>Apply Filter</Text>
      </TouchableOpacity>
    </Pressable>
  </Pressable>
</Modal>
    </View>
  )
}

export default Collection

const styles = StyleSheet.create({
  listContainer: { padding: CARD_MARGIN },
    TitleTop: { fontSize: moderateScale(16), fontFamily: Fonts.Robotobold },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', padding: scale(12) ,paddingBottom:5},
  actionText: { fontSize: moderateScale(14), fontFamily: Fonts.Robotomedium, color: Colors.Black },
  card: { width: CARD_WIDTH, backgroundColor: Colors.White, marginBottom: CARD_MARGIN * 2 },
  cardImage: { width: '98%', height: verticalScale(240),borderWidth:1,borderColor:Colors.Black },
  likeIcon: { position: 'absolute', top: 10, right: 10 },
  cardTitle: { fontSize: moderateScale(13), fontFamily: Fonts.Robotomedium },
  cardPrice: { fontSize: moderateScale(12), fontFamily: Fonts.Robotoregular, color: Colors.Gray },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' },
  modalBox: { backgroundColor: Colors.White,},
  modalTitle: { fontSize: 16, fontFamily: Fonts.Robotomedium, marginBottom: 10 },
  optionRow: { paddingVertical: 12 },
  applyBtn: { backgroundColor: Colors.Black, padding: 13, marginTop: 10 },
  applyText: { color: Colors.White, textAlign: 'center', fontFamily: Fonts.Robotomedium ,fontSize:moderateScale(15)},
  paginationContainer: {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  flexDirection: "row",
  justifyContent: "center",
},
dot: {
  width: scale(6),
  height: scale(6),
  borderRadius: scale(3),
  marginHorizontal: scale(3),
},
});
