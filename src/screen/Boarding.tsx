import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import FastImage from 'react-native-fast-image';
import { Fonts } from '../assets/fonts/Fonts';
import { useNavigation } from '@react-navigation/native';


const Skip = ({ ...props }) => (
    <TouchableOpacity style={{ marginLeft: 20 }} {...props}>
      <Text style={styles.btnText}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity style={{ marginRight: 20 }} {...props}>
      <Text style={styles.btnText}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity style={{ marginRight: 20 }} {...props}>
      <Text style={styles.btnText}>Done</Text>
    </TouchableOpacity>
  );


const Boarding = () => {

    const navigation = useNavigation<any>();

    const finishOnboarding = () => {
      navigation.replace('BottomNavigation');
    };
    
  return (
    <View style={{ flex: 1 }}>
      <Onboarding
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      onSkip={finishOnboarding}
      onDone={finishOnboarding}
      DoneButtonComponent={Done}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: "#fdfefe",
            image: (
              <FastImage 
              source={{
                uri: 'https://www.fairplaycommunications.com/hubfs/Collaboration%20onboarding.gif'
              }}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"/>
            ),
            title: 'Wide Selection',
            subtitle: 'Discover fashion, electronics, home, and more—all in one place.',
          },
          {
            backgroundColor:"#fbfbfb",
            image: (
              <FastImage 
              source={{
                uri: 'https://cdn.dribbble.com/userupload/42153896/file/original-343a0351b81de1a802f5ed02de2d4224.gif'
              }}
              style={{ width: 300, height: 300 }}
              resizeMode="contain" />
            ),
            title: 'Secure & Easy',
            subtitle: 'Shop with safe payments and a fast, simple checkout.',
          },
          {
            backgroundColor: "white",
            image: (
              <FastImage 
              source={{
                uri: 'https://cdn.dribbble.com/userupload/41826503/file/original-74b624fd7e5e0a5734a4e5c7e1a52147.gif'
              }}
              style={{ width: 300, height: 300 }}
               />
            ),
            title: 'Delivered to You',
            subtitle: 'Track orders in real-time and enjoy doorstep delivery.',
          },
        ]}
      />
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({
    title: {
      fontFamily: Fonts.Robotobold,
      fontSize: 24,
      color: '#000',
    },
    subtitle: {
      fontFamily:  Fonts.Robotomedium,
      fontSize: 16,
      color: '#555',
    },
    btnText: {
        fontFamily:  Fonts.Robotomedium,
        fontSize: 16,
        color: '#000',
      },
  });
  