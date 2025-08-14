import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '../theme/useTheme'

export default function FButton({ text, onPress, active = true }) {
    const { theme } = useTheme()
    const styles = useMemo(() => makeStyle(theme), [theme])
  return (
    <TouchableOpacity 
        style={[styles.base, active ? styles.active : styles.disable]}
        onPress={ onPress }
    >
        <Text style={ active ? styles.activeText : styles.disableText }>{text}</Text>
    </TouchableOpacity>
    )
}

function makeStyle(theme){
    return StyleSheet.create({
    base: {
        flexGrow: 1,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: theme.primary,
    },
    disable: {
        backgroundColor: theme.surface,
    },
    activeText: {
        color: theme.black,
    },
    disableText: {
        color: theme.subtext,
    }
})}