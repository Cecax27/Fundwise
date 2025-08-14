import { View, Text, Pressable, Alert, useColorScheme } from 'react-native'
import {makeStyles} from '../../assets/uiStyles'
import { supabase } from '../../lib/supabase/client'
import { useRouter } from 'expo-router'
import ThemeSwitcher from '../../components/themeSwitcher'
import { useTheme } from '../../theme/useTheme'
import { useMemo } from 'react'


export default function Configuration() {
    const {theme} = useTheme()
    const styles = useMemo(() => makeStyles(theme), [theme])
    
    const router = useRouter()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            Alert.alert(error.message)
        } else {
            router.replace('/')
        }
    }

    return (
        <View style={styles.container}>
            <Pressable 
            style={styles.button}
            onPress={() => signOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
            <ThemeSwitcher />
        </View>
    )
}