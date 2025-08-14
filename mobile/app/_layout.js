import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState, useMemo } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from '../lib/supabase/client'
import { Slot } from 'expo-router';
import ThemeProvider from '../theme/ThemeProvider';

const logo = require('../assets/icon.png')

export default function RootLayout() {

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
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}