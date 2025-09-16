import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../component/Header';
import { Fonts } from '../assets/fonts/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Switch } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import { scale, verticalScale, moderateScale } from '../helper/scaling';
import { useAppColors } from '../helper/useAppColors';
import { toggleTheme } from '../redux/slice/ThemeSlice';

const Profile = () => {
  const [toggleSwitchNotification, setToggleSwitchNotification] = useState(false);
  const dispatch = useDispatch();
  const colors = useAppColors();
    const Colors = useAppColors();
    const styles = useStyles(Colors);
  const themeMode = useSelector((state: any) => state.Theme?.mode || 'light');
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [105, 50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const smallHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const smallHeaderTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [8, 0],
    extrapolate: 'clamp',
  });

  const stats = [
    { label: 'Orders', value: '24', icon: 'shopping-bag' },
    { label: 'In Progress', value: '3', icon: 'clock' },
    { label: 'Wishlist', value: '12', icon: 'heart' },
  ];

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };
  
  return (
    <View style={styles.container}>
      {/* <Header /> */}

      <Animated.View
        style={[styles.headerBackground, { height: headerHeight }]}
      >
        <View style={styles.gradient}>
          <Animated.View
            style={[styles.headerContent, { opacity: headerOpacity }]}
          >
            <View style={styles.userInitials}>
              <Text style={styles.initialsText}>B</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Bhavesh</Text>
              <Text style={styles.userEmail}>Bhavesh@gmail.com</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.smallHeader,
              {
                opacity: smallHeaderOpacity,
                transform: [{ translateY: smallHeaderTranslateY }],
              },
            ]}
          >
            <Text style={styles.smallHeaderText}>Bhavesh</Text>
          </Animated.View>
        </View>
      </Animated.View>

      <View style={styles.scrollView}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          <Animated.View>
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={styles.statCardGradient}>
                    <View style={styles.statIcon}>
                      <Feather
                        name={stat.icon as any}
                        size={20}
                        color={Colors.Black}
                      />
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="person"
                      size={18}
                      color={Colors.Black}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Edit Profile</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="location" size={18} color={Colors.Black} />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Address</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="card" size={18} color={Colors.Black} />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>Member ID</Text>
                    <Text style={styles.infoValue}>STYLEHUB12345</Text>
                  </View>
                  <TouchableOpacity onPress={() => copyToClipboard('STYLEHUB12345')} style={styles.copyButton}>
                    <Ionicons
                      name="copy-outline"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="card" size={18} color={Colors.Black} />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Notification</Text>
                  </View>
                  <View style={styles.copyButton}>
                    <Switch  trackColor={{ false: colors.Black, true: colors.Gray }} thumbColor={toggleSwitchNotification ? colors.White : colors.White} onValueChange={setToggleSwitchNotification}value={toggleSwitchNotification}/>
                  </View>
                </View>
              </View> */}

              <View style={[styles.infoCardGradient, { backgroundColor: colors.White }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.infoIconContainer]}>
                    <Ionicons 
                      name={themeMode === 'dark' ? 'moon' : 'sunny'} 
                      size={18} 
                      color={colors.Black} 
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={[styles.infoValue, { color: colors.Black }]}>
                      {themeMode === 'dark' ? 'Dark' : 'Light'} Theme
                    </Text>
                  </View>
                  <View style={styles.copyButton}>
                    <Switch
                    
                      trackColor={{ false: colors.LightGray, true: colors.white85 }}
                      thumbColor={colors.Black}
                      onValueChange={() => {
                        dispatch(toggleTheme());
                        return Promise.resolve();
                      }}
                      value={themeMode === 'dark'}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Feather
                      name="shopping-cart"
                      size={18}
                      color={Colors.Black}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>My Orders</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="share-social"
                      size={18}
                      color={Colors.Black}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Share</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons
                      name="shield"
                      size={18}
                      color={Colors.Black}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Privacy Policy</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCardGradient}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Feather
                      name="headphones"
                      size={18}
                      color={Colors.Black}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoValue}>Contact us</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Black}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.infoCardGradient, styles.logoutCard]}>
                <TouchableOpacity 
                  style={styles.logoutButton}
                  activeOpacity={0.8}
                  onPress={() => console.log('Logout pressed')}
                >
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIconContainer, styles.logoutIconContainer]}>
                      <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={Colors.White}
                      />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoValueLogout}>Logout</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={Colors.Red}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const useStyles = (Colors) =>StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: verticalScale(100),
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(30),
    paddingHorizontal: scale(20),
    backgroundColor: Colors.Black,
  },
  content: {},
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallHeader: {
    position: 'absolute',
    top: verticalScale(8),
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallHeaderText: {
    fontSize: moderateScale(18),
    color: Colors.White,
    fontFamily: Fonts.Robotobold,
  },
  userInitials: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: Colors.ProfileCircle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(15),
  },
  initialsText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: Colors.White,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.Robotobold,
    color: Colors.White,
    marginBottom: verticalScale(4),
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: Colors.white85,
    fontFamily: Fonts.Robotoregular,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  statCard: {
    width: '31%',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    borderWidth: scale(1),
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  statCardGradient: {
    padding: moderateScale(15),
    alignItems: 'center',
    borderRadius: moderateScale(12),
    backgroundColor:Colors.white,
  },
  statIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor:Colors.Semantic,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  statValue: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.Robotobold,
    color: Colors.Black,
    marginBottom: verticalScale(2),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: Colors.Black,
    fontFamily: Fonts.Robotoregular,
  },
  sectionContainer: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  infoCard: {
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
  },
  infoCardGradient: {
    padding: verticalScale(10),
    borderRadius: moderateScale(5),
    borderBottomWidth: scale(0.7),
    borderColor: Colors.Black,
    marginBottom: verticalScale(10),
    paddingHorizontal: 0,
    paddingBottom: verticalScale(5),
  },
  infoIconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor:Colors.Semantic,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButton: {
    borderRadius: scale(20),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: scale(12),
  },
  infoLabel: {
    fontSize: moderateScale(12),
    color: Colors.Gray,
    fontFamily: Fonts.Robotoregular,
    marginBottom: verticalScale(2),
  },
  infoValue: {
    fontSize: moderateScale(14),
    color: Colors.Black,
    fontFamily: Fonts.Robotomedium,
  },
  infoValueLogout: {
    fontSize: moderateScale(15),
    color: Colors.Red,
    fontFamily: Fonts.Robotomedium,
    marginLeft: scale(2),
  },
  logoutCard: {
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  logoutButton: {
    width: '100%',
  },
  logoutIconContainer: {
    backgroundColor: Colors.Red,
    marginRight: scale(12),
  },
  menuContainer: {
    backgroundColor: Colors.White,
    borderRadius: 15,
    margin: 15,
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.Robotomedium,
    color: '#2c3e50',
  },
});
