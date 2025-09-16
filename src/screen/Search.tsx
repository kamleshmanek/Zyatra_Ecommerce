import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useMemo } from 'react';
// import { Colors } from '../theme/Colors';
import Header from '../component/Header';
import { Fonts } from '../assets/fonts/Fonts';
import { scale, verticalScale, moderateScale } from '../theme/dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { GetCollectionApi } from '../redux/slice/CollectionSlice';
import { useNavigation } from '@react-navigation/native';
import { GetSearchApi } from '../redux/slice/SearchSlice';
import ProductCard from '../component/ProductCard';
import { Txt } from '../assets/Txt';
import { useAppColors } from '../helper/useAppColors';

const CARD_MARGIN = scale(10);
const Search = () => {
  const Colors = useAppColors();
  const styles = useStyles(Colors);
    
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const { Topcategories } = useSelector((state: any) => state.category);
  const { SearchData, SearchLoading } = useSelector(
    (state: any) => state.Search,
  );

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    return Topcategories?.filter((item: any) =>
      item?.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const handleTopCategoryPress = (item: any) => {
    dispatch(GetCollectionApi(item?.slug));
    navigation.navigate('Collection', { handle: item?.slug });
    //  setQuery(item?.name)
  };
  const handleSearch = (text: string) => {
    setQuery(text);
    dispatch(GetSearchApi(text));
  };

  const toggleLike = (id: string) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Header />

      <View style={styles.sectionWrapper}>
        <View style={styles.searchBox}>
          <Feather
            name="search"
            size={moderateScale(20)}
            color={query?.length ? Colors.Black : Colors.Gray}
            style={{ marginRight: scale(8) }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={Colors.Gray}
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        {query.length > 0 ? (
          filteredSuggestions.length > 0 ? (
            <View style={styles.suggestionWrapper}>
              <FlatList
                data={filteredSuggestions.slice(0, 3)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleTopCategoryPress(item)}
                  >
                    {index < 2 ? (
                      <Feather
                        name="arrow-up-left"
                        size={moderateScale(16)}
                        color={Colors.Gray}
                        style={{ marginRight: scale(8) }}
                      />
                    ) : (
                      <View style={{ marginRight: scale(24) }}></View>
                    )}
                    <Text style={styles.suggestionText}>{item?.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : null
        ) : null}
      </View>
      {query?.length != 0 &&
        !SearchLoading &&
        !SearchData?.products?.length &&
        !filteredSuggestions.length && (
          <View style={styles.resultWrapper}>
            <Feather
              name="inbox"
              size={moderateScale(40)}
              color={Colors.Black}
            />
            <Text style={styles.resultText}>{Txt?.Noresultsfor} "{query}"</Text>
          </View>
        )}

      {query?.length != 0 && SearchData?.products?.length && (
        <Text style={[styles.TitleTop, { paddingHorizontal: CARD_MARGIN }]}>
          {Txt?.TopProduct}
        </Text>
      )}
      {query?.length != 0 && SearchData?.products?.length && (
        <FlatList
          data={SearchData?.products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              likedItems={likedItems}
              toggleLike={toggleLike}
            />
          )}
        />
      )}
    </View>
  );
};


const useStyles = (Colors) =>
  StyleSheet.create({
    sectionWrapper: {
      marginHorizontal: scale(10),
      marginTop: verticalScale(10),
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.Black,
      borderRadius: scale(10),
      paddingHorizontal: scale(10),
      height: verticalScale(43),
    },
    searchInput: {
      flex: 1,
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
    },
    suggestionWrapper: {
      marginTop: verticalScale(15),
    },
    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(8),
    },
    suggestionText: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotoregular,
      color: Colors.Black,
    },
    resultWrapper: {
      marginTop: verticalScale(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultText: {
      marginTop: verticalScale(8),
      fontSize: moderateScale(16),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
    },
    listContainer: { padding: CARD_MARGIN },
    TitleTop: { fontSize: moderateScale(16), fontFamily: Fonts.Robotobold ,color:Colors.Black},
  });
export default Search;