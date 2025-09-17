import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Fonts } from '../assets/fonts/Fonts';
import { useAppColors } from '../helper/useAppColors';
import { verticalScale, scale, moderateScale } from '../helper/scaling';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';
import { useNavigation } from '@react-navigation/native';

const Address = () => {
  const navigation = useNavigation<any>();
  const addresses = [
    {
      id: 1,
      name: 'Home',
      details: '123 Main Street, Springfield, USA',
      phone: '+1 234 567 890',
      email: 'home@example.com',
      isDefault: true,
      landmark: 'Near Park',
      type: 'Home',
      tagColor: '#4CAF50',
      openingHours: '24/7',
    },
    {
      id: 2,
      name: 'Work',
      details: '456 Business Rd, Metropolis, USA',
      phone: '+1 987 654 321',
      email: 'work@example.com',
      isDefault: false,
      landmark: 'Near Central Park',
      type: 'Office',
      tagColor: '#FFB74D',
      openingHours: '9am - 6pm',
    },
  ];

  const Colors = useAppColors();
  const styles = useStyles(Colors);

  const renderItem = ({ item }) => (
    <View style={[styles.addressCard, item.isDefault && styles.defaultCard]}>
      {/* Edit Button at Top Right */}
      <TouchableOpacity
        style={styles.editBtnTop}
        onPress={() => navigation.navigate('AddEditAddress', { address: item })}
      >
        <MaterialIcons
          name="edit"
          size={16}
          color={Colors.White}
          style={{ marginRight: scale(4) }}
        />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <View style={styles.cardHeader}>
        <MaterialIcons
          name={
            item.type === 'Home'
              ? 'home'
              : item.type === 'Office'
              ? 'work'
              : 'location-on'
          }
          size={20}
          color={Colors.Black}
          style={{ marginRight: scale(8) }}
        />
        <Text style={styles.addressName}>{item.name}</Text>
        {item.isDefault && <Text style={styles.defaultLabel}>Default</Text>}
      </View>

      <Text style={styles.addressDetails}>{item.details}</Text>
      {item.landmark && (
        <Text style={styles.addressLandmark}>Landmark: {item.landmark}</Text>
      )}
      {item.phone && (
        <Text style={styles.addressPhone}>Phone: {item.phone}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBack showCart={false} />
      <FlatList
        data={addresses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No addresses found.</Text>
        }
        contentContainerStyle={{ padding: verticalScale(10) }}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddEditAddress')}
      >
        <MaterialIcons
          name="add-box"
          size={24}
          color={Colors.White}
          style={{ marginRight: scale(6) }}
        />
        <Text style={styles.addText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const useStyles = Colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.White,
    },
    addressCard: {
      backgroundColor: Colors.BackgroundGray,
      borderRadius: scale(5),
      padding: scale(15),
      marginBottom: verticalScale(15),
      shadowColor: Colors.Black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: Colors.Primary,
    },
    defaultCard: {
      borderWidth: 1,
      borderColor: Colors.Primary,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(5),
    },
    addressName: {
      fontSize: moderateScale(16),
      fontFamily: Fonts.Robotosemibold,
      color: Colors.Black,
    },
    defaultLabel: {
      fontSize: moderateScale(12),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Green,
      marginLeft: scale(10),
      backgroundColor: Colors.LightGreen,
      paddingHorizontal: scale(6),
      paddingVertical: verticalScale(2),
      borderRadius: scale(6),
      overflow: 'hidden',
    },
    addressDetails: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(4),
    },
    addressLandmark: {
      fontSize: moderateScale(13),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(4),
    },
    addressPhone: {
      fontSize: moderateScale(13),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(4),
    },
    addressEmail: {
      fontSize: moderateScale(13),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(4),
    },
    addressHours: {
      fontSize: moderateScale(13),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(10),
    },
    editBtn: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      backgroundColor: Colors.Black,
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(6),
      borderRadius: scale(8),
      alignItems: 'center',
    },
    editText: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.White,
    },
    addBtn: {
      flexDirection: 'row',
      backgroundColor: Colors.Black,
      paddingVertical: verticalScale(11),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(10),
    },
    addText: {
      fontSize: moderateScale(16),
      fontFamily: Fonts.Robotobold,
      color: Colors.White,
    },
    emptyText: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      textAlign: 'center',
      marginTop: verticalScale(50),
    },
    editBtnTop: {
      position: 'absolute',
      top: verticalScale(10),
      right: scale(10),
      flexDirection: 'row',
      backgroundColor: Colors.Black,
      paddingHorizontal: scale(10),
      paddingVertical: verticalScale(6),
      borderRadius: scale(8),
      alignItems: 'center',
      zIndex: 1,
    },
  });
