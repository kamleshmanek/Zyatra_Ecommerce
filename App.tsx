import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './src/theme/Colors';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { fetchMultipleCategories,fetchBrands } from './src/redux/slice/homeSlice';
import { TopCategoryCategories } from './src/redux/slice/CatgeorySlice';

const AppContent = () => {
  useEffect(() => {
    store.dispatch(fetchMultipleCategories());
    store.dispatch(fetchBrands());
    store.dispatch(TopCategoryCategories());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
        <MainNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

