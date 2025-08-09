import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import 'react-native-url-polyfill/auto'
import Auth from '../components/auth'
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client'
import { Redirect } from 'expo-router'

const logo = require('../assets/icon.png')

export default function Index() {
    const [session, setSession] = useState(null)
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
      }, []);

      if (session) {
        return <Redirect href="/(tabs)/" />
      }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.logoText}>Fundwise</Text>
      <Text style={styles.title}>Sign In</Text>
      <Auth />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    paddingTop: 70,
    padding: 20
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain'
  },
  logoText: {
    fontSize: 32, 
    color: '#e1523d', 
    fontFamily: 'Quicksand-Bold', 
    marginBottom: 20
  },
  title: {
    fontSize: 24, 
    fontFamily: 'Quicksand-Bold', 
    marginBottom: 30
  }
});
