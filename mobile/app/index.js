import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import 'react-native-url-polyfill/auto'
import Auth from '../components/auth'
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase/client'
import { Redirect } from 'expo-router'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'

const logo = require('../assets/icon.png')

export default function Index() {
  const { theme } = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

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
    <View style={[styles.container, styles.centeredView]}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.logoText}>Fundwise</Text>
      <Text style={styles.title}>Sign In</Text>
      <Auth />
      <StatusBar style='auto' />
    </View>
  );
}
