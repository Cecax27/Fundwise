import { View, Text } from 'react-native'
import React, {useMemo} from 'react'
import { Stack } from 'expo-router'
import { useTheme } from '../../../theme/useTheme'
import { makeStyles } from '../../../assets/uiStyles'

export default function NewBudget() {
    const { theme } = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <>
    <Stack.Screen
        options={{
          title: "New", // 👈 esto reemplaza el nombre del archivo
          // headerRight: () => <MiBoton/>   // ejemplo si quieres un botón
          
        }}
      />
    <View style={styles.container}>
      <Text>NewBudget</Text>
    </View>
    </>
  )
}

NewBudget.options = {
    title: "Mi Dashboard",   // lo que sale en el header
    headerShown: true,       // opcional, si lo quieres mostrar
}