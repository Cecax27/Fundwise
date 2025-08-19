import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useMemo} from 'react'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'
import { useRouter } from 'expo-router'

export default function CheckEmail() {
    const {theme} = useTheme();
    const styles = useMemo(()=>makeStyles(theme), [theme]);

    const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={[styles.centeredView, {gap:22}]}>
            <Image 
            source={require('../assets/icon.png')}
            style={{width:100, height:100}}/>
            <Text style={[styles.h1, {textAlign:'center'}]}>Check your inbox</Text>
            <Text style={[styles.h2, {textAlign:'center'}]}>We sent you a confirmation email. Open it to verify your account.</Text>
            <Text style={[styles.label, {textAlign:'center'}]}>Can’t find it? Check your spam.</Text>
            <TouchableOpacity style={[styles.button, {backgroundColor:theme.mint}]} onPress={() => router.push("/")}>
                <Text style={styles.buttonText}>
                    Back to login
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}