import { TouchableOpacity, View, Text, Image} from 'react-native'
import { makeStyles } from '../../assets/uiStyles'
import Resume from '../../components/resume'
import { useTheme } from '../../theme/useTheme'
import { useMemo } from 'react'
import { BudgetPlans } from '../../components/budgetPlans/budgetPlans'
import FloatActionButton from '../../components/floatActionButton'

export default function Dashboard() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    

    return (
        <View style={[styles.container, { backgroundColor: theme.background, color: theme.text }]}> 
            <Resume />
            <View style={styles.dashboard}>
                <BudgetPlans />
            </View>
            <FloatActionButton 
            content={<Image source={require('../../assets/icons/add_tool.png')} style={{width:24, height:24}} />}>
                <FloatActionButton.Item 
                content={
                    <View style={{flexDirection:'row', gap:10, justifyContent:'center'}}>
                        <Image source={require('../../assets/icons/add_budget.png')} style={{width:20,  height:20}}/>
                        <Text style={{fontSize:12, fontFamily:'Montserrat-SemiBold'}}>Budget plan</Text>
                    </View>}
                onPress={()=>{}}/>
            </FloatActionButton>
        </View>
    )   
}