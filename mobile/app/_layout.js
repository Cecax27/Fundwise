import { StatusBar } from 'react-native'
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from '../lib/supabase/client'
import { Slot } from 'expo-router';
import ThemeProvider from '../theme/ThemeProvider';
import { useTheme } from '../theme/useTheme';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const { theme, isDark } = useTheme();
  const router = useRouter()

  const [fontLoaded, setFontLoaded] = useState(false);
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    const subscription = Linking.addEventListener('url', ({ url }) => {
      if (url.includes('/auth/callback')) {
        // Aquí manejas la sesión con Supabase
        router.replace('/index'); 
      }

      return () => {
        subscription.remove();
      };
    });


  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Slot />
      
    </ThemeProvider>
  );
}