import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../assets/fonts/Fonts';
import { useAppColors } from '../helper/useAppColors';
import { verticalScale, scale, moderateScale } from '../helper/scaling';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header';

const AddEditAddress = ({ route, navigation }) => {
  const Colors = useAppColors();
  const styles = useStyles(Colors);

  const editingAddress = route.params?.address || null;

  const [name, setName] = useState(editingAddress?.name || '');
  const [details, setDetails] = useState(editingAddress?.details || '');
  const [landmark, setLandmark] = useState(editingAddress?.landmark || '');
  const [phone, setPhone] = useState(editingAddress?.phone || '');
  const [email, setEmail] = useState(editingAddress?.email || '');
  const [openingHours, setOpeningHours] = useState(
    editingAddress?.openingHours || '',
  );
  const [type, setType] = useState(editingAddress?.type || 'Home');
  const [isDefault, setIsDefault] = useState(
    editingAddress?.isDefault || false,
  );

  const handleSave = () => {
    console.log({
      name,
      details,
      landmark,
      phone,
      email,
      openingHours,
      type,
      isDefault,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        showCart={false}
        showBack
        title={editingAddress ? 'Edit Address' : 'Add Address'}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: scale(15) }}>
          <Text style={styles.label}>Address Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Home, Work, etc."
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Address Details</Text>
          <TextInput
            style={styles.input}
            value={details}
            onChangeText={setDetails}
            placeholder="Street, City, Country"
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Near Park, Mall, etc."
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+1 234 567 890"
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="example@email.com"
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Opening Hours</Text>
          <TextInput
            style={styles.input}
            value={openingHours}
            onChangeText={setOpeningHours}
            placeholder="9am - 6pm"
            placeholderTextColor={Colors.Gray}
          />

          <Text style={styles.label}>Address Type</Text>
          <View style={styles.typeContainer}>
            {['Home', 'Office', 'Other'].map(t => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.typeBtn,
                  type === t && { backgroundColor: Colors.Black },
                ]}
                onPress={() => setType(t)}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === t && { color: Colors.White },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.defaultContainer}>
            <TouchableOpacity
              onPress={() => setIsDefault(!isDefault)}
              style={styles.checkbox}
            >
              {isDefault && (
                <MaterialIcons name="check" size={20} color={Colors.Black} />
              )}
            </TouchableOpacity>
            <Text style={styles.defaultText}>Set as default address</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>
            {editingAddress ? 'Update' : 'Add Address'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEditAddress;

const useStyles = Colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.White,
    },
    label: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
      marginBottom: verticalScale(6),
      marginTop: verticalScale(7),
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.Black,
      borderRadius: scale(5),
      paddingHorizontal: scale(12),
      paddingVertical: verticalScale(10),
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
      marginBottom: verticalScale(10),
    },
    typeContainer: {
      flexDirection: 'row',
      marginBottom: verticalScale(15),
    },
    typeBtn: {
      borderWidth: 1,
      borderColor: Colors.Gray,
      borderRadius: scale(8),
      paddingHorizontal: scale(15),
      paddingVertical: verticalScale(8),
      marginRight: scale(10),
    },
    typeText: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
    },
    defaultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    checkbox: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(4),
      borderWidth: 1,
      borderColor: Colors.Black,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(10),
      backgroundColor: Colors.White,
    },
    defaultText: {
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
    },
    saveBtn: {
      backgroundColor: Colors.Black,
      paddingVertical: verticalScale(14),
      //   borderRadius: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(20),
    },
    saveText: {
      fontSize: moderateScale(16),
      fontFamily: Fonts.Robotomedium,
      color: Colors.White,
    },
  });
