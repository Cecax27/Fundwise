import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { signIn } from '../lib/supabase/auth'
import { Link, useRouter } from 'expo-router'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await signIn(email, password)

    if (error) Alert.alert(error.message)
    else router.replace('/index')
    setLoading(false)
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={'none'}
          keyboardType="email-address"
          autoComplete="username"
          textContentType="emailAddress"
          style={styles.input}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          keyboardType="default"
          autoComplete="new-password"
          textContentType="newPassword"
          style={styles.input}
        />
      </View>
      <View style={styles.container}>
        <Pressable 
        disabled={loading} 
        onPress={() => signInWithEmail()} 
        style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Link href="/signUp">
          <Text style={{ color: '#053547', fontFamily: 'Montserrat-SemiBold'}}>Don&apos;t have an account? Sign up</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'left',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16, 
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#05354730',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#053547',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', 
    fontFamily: 'Montserrat-SemiBold'
  }
})