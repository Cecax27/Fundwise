import { View, Pressable, Alert, Text, Image } from 'react-native'
import { useBudget } from '../../hooks/useBudget'
import { useTheme } from '../../theme/useTheme'
import { makeStyles } from '../../assets/uiStyles'
import { useMemo } from 'react'

const period_types = {
    month: 'Monthly',
    week: 'Weekly',
    year: 'Yearly',
    custom: 'Custom'
}

export function BudgetPlans() {
    const { budgetPlans } = useBudget();
    const { theme } = useTheme();
        const styles = useMemo(() => makeStyles(theme), [theme]);

    return (
        <>
        {budgetPlans.map((plan) => (
                    <Pressable
                        key={plan.id}
                        style={styles.toolCard}
                        onPress={() => Alert.alert(`Budget Plan: ${plan.name}`)}
                    >
                        <View style={styles.toolCardContent}>
                            <Image source={require("../../assets/icons/budget.png")} style={styles.toolIcon}/>
                            <Text style={styles.toolTitle}>{plan.name}</Text>
                            <Text style={styles.toolSubtitle}>{period_types[plan.period_type]}</Text>
                            <Text style={[styles.cardSubtitle, { color: theme.text }]}></Text>
                        </View>
                    </Pressable>
                ))}
        </>
    );
}