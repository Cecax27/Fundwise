import { View, Text } from 'react-native'
import React from 'react'
import globalStyles from '../assets/uiStyles'

export default function LabelWithText({ label, text }) {
  return (
    <View>
      <Text style={globalStyles.p}>{label}</Text>
        <Text style={globalStyles.Label}>{text}</Text>
    </View>
  )
}