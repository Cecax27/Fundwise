import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert, Pressable, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import 'react-native-url-polyfill/auto'
import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase/client'
import { Link, useRouter } from 'expo-router';
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'
import LanguageSelector from '../components/languageSelector';
import { useTranslation } from 'react-i18next';

const logo = require('../assets/icon.png')

export default function SignUp() {
  const { t } = useTranslation();
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
    Alert.alert('Oh no', t('signup.password-no-match'))
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
      <Text style={styles.title}>{t('signup.title')}</Text>
      {loading && <ActivityIndicator size="large" color={theme.primary} style={{marginTop:40}}/>}
      {!loading && <View style={{justifyContent: 'center', alignItems: 'center'}}>
         <View style={{alignItems: 'center'}}>
            <Text style={[styles.p, {marginTop: 22}]}>
                {t('shared.email')}
            </Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="luke@jedi.com"
                autoCapitalize={'none'}
                style={[styles.textInput, {width:250}]}
                placeholderTextColor={theme.subtext}
                textAlign="center"
                keyboardType='email-address'
            />
          </View> 
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={styles.p}>
              {t('shared.password')}
            </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder={t('signup.password-holder')}
              autoCapitalize={'none'}
              style={[styles.textInput, {width:250}]}
              placeholderTextColor={theme.subtext}
              textAlign="center"
              textContentType='password'
              autoComplete='password-new'
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={styles.p}>
              {t('signup.confirm-password')}
            </Text>
            <TextInput
              onChangeText={(text) => setPasswordConfirmation(text)}
              value={passwordConfirmation}
              secureTextEntry={true}
              placeholder={t('signup.confirm-password-holder')}
              autoCapitalize={'none'}
              style={[styles.textInput, {width:250}]}
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
                <Text style={styles.buttonText}>{t('signup.button')}</Text>
              </Pressable>
            </View>
            <View style={{marginTop:8}}>
              <Link href="/">
                <Text style={{ color: theme.mint, fontFamily: 'Montserrat-SemiBold'}}>{t('signup.have-account')}</Text>
              </Link>
            </View>
          </View>}
        <LanguageSelector />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
