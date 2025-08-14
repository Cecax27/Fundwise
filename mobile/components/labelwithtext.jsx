import { View, Text } from 'react-native'
import React, {useMemo} from 'react'
import { makeStyles } from '../assets/uiStyles'
import { useTheme } from '../theme/useTheme'

export default function LabelWithText({ label, text }) {
  const { theme } = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  return (
    <View>
      <Text style={styles.p}>{label}</Text>
        <Text style={styles.label}>{text}</Text>
    </View>
  )
}