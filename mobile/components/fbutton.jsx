import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function FButton({ text, onPress, active = true }) {
  return (
    <TouchableOpacity 
        style={[styles.base, active ? styles.active : styles.disable]}
        onPress={ onPress }
    >
        <Text style={ active ? styles.activeText : styles.disableText }>{text}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        flexGrow: 1,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#053547',
    },
    disable: {
        backgroundColor: '#ccc',
    },
    activeText: {
        color: '#fff',
    },
    disableText: {
        color: '#666',
    }
})