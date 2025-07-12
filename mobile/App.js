import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto'
import { supabase } from './lib/supabase'
import Auth from './components/auth'

const logo = require('./assets/icon.png')

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [session, setSession] = useState(null)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
        'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
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
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.logoText}>Fundwise</Text>
      <Text style={styles.title}>Sign In</Text>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 72,
    resizeMode: 'contain'
  },
  logoText: {
    fontSize: 26, 
    color: '#e1523d', 
    fontFamily: 'Quicksand-Bold', 
    marginBottom: 20
  },
  title: {
    fontSize: 24, 
    fontFamily: 'Quicksand-Bold', 
    marginBottom: 20
  }
});
