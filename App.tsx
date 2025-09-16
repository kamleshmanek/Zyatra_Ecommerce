import React, { useEffect } from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useAppColors } from './src/helper/useAppColors';
import {
  fetchMultipleCategories,
  fetchBrands,
} from './src/redux/slice/homeSlice';
import { TopCategoryCategories } from './src/redux/slice/CatgeorySlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

const AppContent = () => {
  useEffect(() => {
    store.dispatch(fetchMultipleCategories());
    store.dispatch(fetchBrands());
    store.dispatch(TopCategoryCategories());
  }, []);

  const colors = useAppColors();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.White }}>
        <MainNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
