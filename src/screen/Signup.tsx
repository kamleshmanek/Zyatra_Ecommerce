import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../assets/fonts/Fonts';
import { useAppColors } from '../helper/useAppColors';
import { scale, moderateScale, verticalScale } from '../theme/dimensions';

const Signup = () => {
  const Colors = useAppColors();
  const styles = useStyles(Colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={Colors.Gray}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.Gray}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.Gray}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.loginLink}>Login</Text>
      </Text>
    </View>
  );
};

export default Signup;

const useStyles = (Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.White,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(20),
    },
    title: {
      fontSize: moderateScale(28),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
      marginBottom: verticalScale(10),
    },
    subtitle: {
      fontSize: moderateScale(16),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
      marginBottom: verticalScale(30),
    },
    input: {
      width: '100%',
      backgroundColor: Colors.White,
      borderRadius: scale(5),
      paddingHorizontal: scale(15),
      paddingVertical: verticalScale(12),
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Black,
      marginBottom: verticalScale(15),
      borderWidth: 1,
      borderColor: Colors.Black,
    },
    signupBtn: {
      width: '100%',
      backgroundColor: Colors.Black,
      borderRadius: scale(5),
      paddingVertical: verticalScale(11),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(10),
    },
    signupText: {
      fontSize: moderateScale(17),
      fontFamily: Fonts.Robotomedium,
      color: Colors.White,
    },
    footerText: {
      marginTop: verticalScale(20),
      fontSize: moderateScale(14),
      fontFamily: Fonts.Robotomedium,
      color: Colors.Gray,
    },
    loginLink: {
      color: Colors.Black,
      fontFamily: Fonts.Robotomedium,
    },
  });
