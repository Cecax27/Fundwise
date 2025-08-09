import { View, Pressable, Alert } from 'react-native'
import styles from '../../assets/uiStyles'
import Resume from '../../components/resume'


export default function Dashboard() {


    return (
        <View style={styles.container}> 
            <Resume />
        </View>
    )   
}