import { View, Pressable, Alert } from 'react-native'
import { styles } from '../../assets/uiStyles'
import Resume from '../../components/resume'
import { useTheme } from '../../theme/useTheme'

export default function Dashboard() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background, color: theme.text }]}> 
            <Resume />
        </View>
    )   
}