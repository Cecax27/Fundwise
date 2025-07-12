import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

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
        <Pressable 
        disabled={loading} 
        onPress={() => signUpWithEmail()} 
        style={{
          marginBottom: 10
        }}>
          <Text style={{ color: '#053547', fontFamily: 'Montserrat-SemiBold'}}>Don&apos;t have an account? Sign up</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16, 
    fontFamily: 'Montserrat-Medium'
  },
  input: {
    borderWidth: 1,
    borderColor: '#05354730',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    width: 300,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#053547',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    width: 100,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', 
    fontFamily: 'Montserrat-SemiBold'
  }
})