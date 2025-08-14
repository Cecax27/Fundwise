import React, { useState, useMemo } from 'react'
import { Alert, View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { signIn } from '../lib/supabase/auth'
import { Link, useRouter } from 'expo-router'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'

export default function Auth() {
const {theme} = useTheme()
const styles = useMemo(() => makeStyles(theme), [theme])

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await signIn(email, password)

    if (error) Alert.alert(error.message)
    else router.replace('/(tabs)/')
    setLoading(false)
  
  }

  return (
    <KeyboardAvoidingView 
          style={{justifyContent: 'center', alignItems: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={100}
      >
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.p, {marginTop: 22}]}>
          Email
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="LukeSkywalker@JediOrder.com"
          autoCapitalize={'none'}
          keyboardType="email-address"
          autoComplete="username"
          textContentType="emailAddress"
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
          keyboardType="default"
          autoComplete="new-password"
          textContentType="newPassword"
          style={styles.textInput}
          placeholderTextColor={theme.subtext}
          textAlign="center"
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Pressable 
        disabled={loading} 
        onPress={() => signInWithEmail()} 
        style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Link href="/signUp">
          <Text style={{ color: theme.primary, fontFamily: 'Montserrat-SemiBold'}}>Don&apos;t have an account? Sign up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}