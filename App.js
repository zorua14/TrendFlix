import React, { useCallback, useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'



export default function App() {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
  })


  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync()
  }
  return (
    <AppNavigator />
  );
}


