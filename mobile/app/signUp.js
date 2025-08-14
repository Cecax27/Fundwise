import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import 'react-native-url-polyfill/auto'
import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase/client'
import { Link } from 'expo-router';
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'

const logo = require('../assets/icon.png')

export default function SignUp() {
  const { theme } = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
    setLoading(true)
    const {
        data: { session },
        error,
    } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
    }

  return (
    <KeyboardAvoidingView 
              style={[styles.container, styles.centeredView]}
              behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
              keyboardVerticalOffset={100}
          >

      <Image source={logo} style={styles.logo}/>
      <Text style={styles.logoText}>Fundwise</Text>
      <Text style={styles.title}>Sign Up</Text>
      <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.p, {marginTop: 22}]}>
                Email
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="LukeSkywalker@JediOrder.com"
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={theme.subtext}
                textAlign="center"
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.p}>
                Password
              </Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="*********"
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={theme.subtext}
                textAlign="center"
              />
            </View>
            <View>
              <Pressable 
              disabled={loading} 
              onPress={() => signUpWithEmail()} 
              style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
              </Pressable>
            </View>
            <View>
              <Link href="/">
                <Text style={{ color: theme.primary, fontFamily: 'Montserrat-SemiBold'}}>Have an account already? Sing in</Text>
              </Link>
            </View>
          </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
