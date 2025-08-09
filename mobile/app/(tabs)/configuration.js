import { View, Text, Pressable, Alert } from 'react-native'
import styles from '../../assets/uiStyles'
import { supabase } from '../../lib/supabase/client'
import { useRouter } from 'expo-router'


export default function Configuration() {

    const router = useRouter()

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) Alert.alert(error.message)
        else router.replace('/')
    }

    return (
        <View style={styles.container}>
            <Pressable 
            style={styles.button}
            onPress={() => signOut()}>
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
        </View>
    )
}