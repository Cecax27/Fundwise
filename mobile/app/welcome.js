import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useMemo} from 'react'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'
import { useRouter } from 'expo-router'
import { setWelcomeSeen } from '../lib/welcomeSeen'

export default function Welcome() {
    const {theme} = useTheme();
    const styles = useMemo(()=>makeStyles(theme), [theme]);

    const router = useRouter();

    const handleGetStarted = () => {
        setWelcomeSeen()
        router.replace('/(tabs)/accounts/')
    }

  return (
    <ScrollView contentContainerStyle={[styles.container,styles.centeredView]}>
      
      {/* Logo y saludo */}
      <Image 
        source={require('../assets/icon.png')}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={[styles.title, { color: theme.mint }]}>
        Welcome to Fundwise!
      </Text>
      <Text style={[styles.p, { textAlign: 'center', marginBottom: 30, color: theme.subtext }]}>
        {"Let's get you started. Here's a quick guide to start managing your finances."}
      </Text>

      {/* Paso 1 */}
      <View style={{ backgroundColor: theme.surface, padding: 20, borderRadius: 20, marginBottom: 15, width: '100%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
        <Text style={[styles.p, { fontSize: 14, fontWeight: 'bold', marginBottom: 8 }]}>1. Create your first account</Text>
        <Text style={[styles.p, { fontSize: 12, }]}>
        Add your first account to start tracking your bank or cash balances.
        </Text>
      </View>

      {/* Paso 2 */}
      <View style={{ backgroundColor: theme.surface, padding: 20, borderRadius: 20, marginBottom: 15, width: '100%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
        <Text style={[styles.p, { fontSize: 14, fontWeight: 'bold', marginBottom: 8 }]}>2. Add incomes and spendings</Text>
        <Text style={[styles.p, { fontSize: 12, }]}>
          Start tracking your money by adding your income and expenses. See where your money goes!
        </Text>
      </View>

      {/* Paso 3 */}
      <View style={{ backgroundColor: theme.surface, padding: 20, borderRadius: 20, marginBottom: 15, width: '100%', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 }}>
        <Text style={[styles.p, { fontSize: 14, fontWeight: 'bold', marginBottom: 8 }]}>3. Explore your dashboard</Text>
        <Text style={[styles.p, { fontSize: 12, }]}>
          Access your dashboard to add tools, see summaries, and get insights about your finances.
        </Text>
      </View>

      {/* Botón para continuar */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handleGetStarted()} // o el flujo que quieras
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}