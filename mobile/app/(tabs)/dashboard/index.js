import { TouchableOpacity, View, Text, Image} from 'react-native'
import { makeStyles } from '../../../assets/uiStyles'
import Resume from '../../../components/resume'
import { useTheme } from '../../../theme/useTheme'
import { useMemo } from 'react'
import { BudgetPlans } from '../../../components/budgetPlans/budgetPlans'
import FloatActionButton from '../../../components/floatActionButton'
import { useRouter , Stack} from 'expo-router'


export default function Dashboard() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    
    const router = useRouter()

    return (
        <>
        <Stack.Screen
        options={{
          title: "Dashboard", // 👈 esto reemplaza el nombre del archivo
          // headerRight: () => <MiBoton/>   // ejemplo si quieres un botón
        }}
      />
        <View style={[styles.container, { backgroundColor: theme.background, color: theme.text }]}> 
            <Resume />
            <View style={styles.dashboard}>
                <BudgetPlans />
            </View>
            <FloatActionButton 
            content={<Image source={require('../../../assets/icons/add_tool.png')} style={{width:24, height:24}} />}>
                <FloatActionButton.Item 
                content={
                    <View style={{flexDirection:'row', gap:10, justifyContent:'center'}}>
                        <Image source={require('../../../assets/icons/add_budget.png')} style={{width:20,  height:20}}/>
                        <Text style={{fontSize:12, fontFamily:'Montserrat-SemiBold'}}>Budget plan</Text>
                    </View>}
                onPress={()=>{router.push('/dashboard/newBudget')}}/>
            </FloatActionButton>
        </View>
        </>
    )   
}

Dashboard.options = {
    title: 'Dashboard',
    headerShown: true
}