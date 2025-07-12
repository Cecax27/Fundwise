import { View, Text, Pressable, Alert } from 'react-native'
import styles from '../assets/uiStyles'
import { supabase } from '../lib/supabase'
import { useRouter } from 'expo-router'

export default function Dashboard() {

    const router = useRouter()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) Alert.alert(error.message)
        else router.replace('/')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Pressable 
            style={styles.button}
            onPress={() => signOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
        </View>
    )
}