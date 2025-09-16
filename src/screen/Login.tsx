import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../assets/fonts/Fonts';
import { useAppColors } from '../helper/useAppColors';
import { scale, moderateScale, verticalScale } from '../theme/dimensions';

const Login = () => {
  const Colors = useAppColors();
  const styles = useStyles(Colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

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

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account? <Text style={styles.signupText}>Sign Up</Text>
      </Text>
    </View>
  );
};

export default Login;

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
    loginBtn: {
      width: '100%',
      backgroundColor: Colors.Black,
      borderRadius: scale(5),
      paddingVertical: verticalScale(11),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(10),
    },
    loginText: {
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
    signupText: {
      color: Colors.Black,
      fontFamily: Fonts.Robotomedium,
    },
  });
