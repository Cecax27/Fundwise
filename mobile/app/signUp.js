import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert, Pressable, TextInput } from 'react-native';
import 'react-native-url-polyfill/auto'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'expo-router';

const logo = require('../assets/icon.png')

export default function SignUp() {
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
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.logoText}>Fundwise</Text>
      <Text style={styles.title}>Sign Up</Text>
      <View>
            <View>
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
            <View>
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
                <Text style={{ color: '#053547', fontFamily: 'Montserrat-SemiBold'}}>Have an account already? Sing in</Text>
              </Link>
            </View>
          </View>
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
});
