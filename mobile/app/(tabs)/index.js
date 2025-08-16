import { View} from 'react-native'
import { makeStyles } from '../../assets/uiStyles'
import Resume from '../../components/resume'
import { useTheme } from '../../theme/useTheme'
import { useMemo } from 'react'
import { BudgetPlans } from '../../components/budgetPlans/budgetPlans'

export default function Dashboard() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    

    return (
        <View style={[styles.container, { backgroundColor: theme.background, color: theme.text }]}> 
            <Resume />
            <View style={styles.dashboard}>
                <BudgetPlans />
            </View>
        </View>
    )   
}