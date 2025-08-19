import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import 'react-native-url-polyfill/auto'
import Auth from '../components/auth'
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase/client'
import { useRouter } from 'expo-router'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'
import { checkWelcomeSeen } from '../lib/welcomeSeen';

const logo = require('../assets/icon.png')

export default function Index() {
  const { theme, isDark } = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])
  const router = useRouter()

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [seenWelcome, setSeenWelcome] = useState(false)
    
    useEffect(() => {
      console.log('Pase por aqui');
      
      setLoading(true);
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        setLoading(false);
        if (session) {
          checkWelcomeSeen()
          .then((result)=>setSeenWelcome(result))
          .then(()=>{
            if(seenWelcome) { router.replace('/(tabs)/')}
            else { router.replace('/welcome')}
          })
          .catch((error)=>console.log(error))
      }
      }, []);
      

  return (
    <View style={[styles.container, styles.centeredView]}>
      <Image source={logo} style={styles.logo}/>
      {loading&&<ActivityIndicator size="large" color={theme.primary} style={{marginTop:40}}/>}
      {!loading&&<>
      <Text style={styles.title}>Sign In</Text>
      <Auth />
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      </>}
    </View>
  );
}
