// import React, { useCallback, useEffect } from 'react';
// import AppNavigator from './AppNavigator';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { MenuProvider } from 'react-native-popup-menu';



// export default function App() {
//   useEffect(() => {
//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare();
//   }, [])
//   const [fontsLoaded] = useFonts({
//     'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
//     'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
//     'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
//   })


//   if (!fontsLoaded) {
//     return undefined;
//   } else {
//     SplashScreen.hideAsync()
//   }
//   return (
//     <MenuProvider>
//       <AppNavigator />
//     </MenuProvider>
//   );
// }
import React, { useCallback, useEffect, useState } from 'react';
import AppNavigator from './AppNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      // Simulate a longer loading time
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const hideSplashScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
        setAppReady(true);
        SplashScreen.hideAsync();
      };
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!isAppReady) {
    return null; // Return null while splash screen is visible
  }

  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  );
}


