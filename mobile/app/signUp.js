import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert, Pressable, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import 'react-native-url-polyfill/auto'
import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase/client'
import { Link, useRouter } from 'expo-router';
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'

const logo = require('../assets/icon.png')

export default function SignUp() {
  const { theme } = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
  setLoading(true)
  if (password !== passwordConfirmation){
    Alert.alert('Oh no', 'The password doesnt match, try again.')
    setLoading(false)
    return
  }
  const {
      data: { session },
      error,
  } = await supabase.auth.signUp({
      email: email,
      password: password,
  })

  if (error) Alert.alert(error.message)
  if (!session) router.replace('checkEmail')
  setLoading(false)
  }

  return (
    <KeyboardAvoidingView 
              style={[styles.container, styles.centeredView]}
              behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
              keyboardVerticalOffset={100}
          >

      <Image source={logo} style={styles.logo}/>
      <Text style={styles.title}>Create your account</Text>
      {loading && <ActivityIndicator size="large" color={theme.primary} style={{marginTop:40}}/>}
      {!loading && <View style={{justifyContent: 'center', alignItems: 'center'}}>
         <View style={{alignItems: 'center'}}>
            <Text style={[styles.p, {marginTop: 22}]}>
                Email
            </Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="luke@jedi.com"
                autoCapitalize={'none'}
                style={styles.textInput}
                placeholderTextColor={theme.subtext}
                textAlign="center"
                keyboardType='email-address'
            />
          </View> 
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={styles.p}>
              Password
            </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Something stronger than '1234'"
              autoCapitalize={'none'}
              style={styles.textInput}
              placeholderTextColor={theme.subtext}
              textAlign="center"
              textContentType='password'
              autoComplete='password-new'
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={styles.p}>
              Confirm Password
            </Text>
            <TextInput
              onChangeText={(text) => setPasswordConfirmation(text)}
              value={passwordConfirmation}
              secureTextEntry={true}
              placeholder="One more time"
              autoCapitalize={'none'}
              style={styles.textInput}
              placeholderTextColor={theme.subtext}
              textAlign="center"
              textContentType='password'
              autoComplete='password-new'
            />
          </View>
            <View style={{marginTop:20}}>
              <Pressable 
              disabled={loading} 
              onPress={() => signUpWithEmail()} 
              style={[styles.button, {backgroundColor:theme.mint  }]}>
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
            </View>
            <View style={{marginTop:8}}>
              <Link href="/">
                <Text style={{ color: theme.mint, fontFamily: 'Montserrat-SemiBold'}}>Already have an account? Sign in</Text>
              </Link>
            </View>
          </View>}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
