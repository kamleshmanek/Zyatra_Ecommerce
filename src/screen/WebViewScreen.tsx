import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommonWebView from '../component/CommonWebView';
import Header from '../component/Header';

interface RouteParams {
  uri: string;
  title?: string;
}

const WebViewScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uri, title } = route.params as RouteParams;

  return (
    <View style={{ flex: 1 }}>
    <Header showBack showCart={false} />
      <CommonWebView source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
});

export default WebViewScreen;
